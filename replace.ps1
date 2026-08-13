$files = Get-ChildItem -Path "d:\August Websites\Electrician & Wiring Services" -Filter "*.html" | Where-Object { $_.Name -ne 'login.html' -and $_.Name -ne 'register.html' }

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace theme button
    $themeRegex = '<button class="btn btn-link p-0 text-muted theme-toggle-btn"[^>]*>[\s\S]*?<\/button>'
    $themeReplacement = '<button class="btn btn-link p-0 text-muted border border-secondary rounded-circle theme-toggle-btn d-flex align-items-center justify-content-center" style="width: 36px; height: 36px;" aria-label="Toggle Theme"><i data-lucide="moon" width="18" height="18"></i></button>'
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, $themeRegex, $themeReplacement)
    
    # Replace RTL button
    $rtlRegex = '<button class="btn btn-link p-0 text-muted rtl-toggle-btn text-decoration-none fw-bold"[^>]*>[\s\S]*?<\/button>'
    $rtlReplacement = '<button class="btn btn-link p-0 text-muted border border-secondary rounded-circle rtl-toggle-btn d-flex align-items-center justify-content-center text-decoration-none" style="width: 36px; height: 36px;" aria-label="Toggle RTL"><i data-lucide="arrow-right-left" width="18" height="18"></i></button>'
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, $rtlRegex, $rtlReplacement)
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
}
Write-Output 'Replaced successfully.'
