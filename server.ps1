$httpListener = [System.Net.HttpListener]::new()
$httpListener.Prefixes.Add('http://localhost:8080/')
$httpListener.Start()
Write-Host 'Server started on http://localhost:8080'

$baseDir = 'C:\Users\Nikola.Dolas\OneDrive - Media House\Desktop\DolasAds'

while ($httpListener.IsListening) {
    $context = $httpListener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $path = $request.Url.LocalPath
    if ($path -eq '/') { $path = '/index.html' }

    $filePath = Join-Path $baseDir $path.TrimStart('/')

    if (Test-Path $filePath) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath)

        $mimeTypes = @{
            '.html' = 'text/html; charset=utf-8'
            '.css'  = 'text/css; charset=utf-8'
            '.js'   = 'application/javascript; charset=utf-8'
            '.png'  = 'image/png'
            '.jpg'  = 'image/jpeg'
            '.svg'  = 'image/svg+xml'
            '.ico'  = 'image/x-icon'
        }

        if ($mimeTypes.ContainsKey($ext)) {
            $response.ContentType = $mimeTypes[$ext]
        } else {
            $response.ContentType = 'application/octet-stream'
        }

        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes('Not Found')
        $response.OutputStream.Write($msg, 0, $msg.Length)
    }

    $response.Close()
}
