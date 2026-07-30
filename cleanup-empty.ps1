# Hapus file kosong (0 byte) dari ./src, ./components
Get-ChildItem -Path .\src, .\components -Recurse -File | Where-Object { $_.Length -eq 0 } | ForEach-Object {
    Write-Output "Deleting empty file: $($_.FullName)"
    Remove-Item $_.FullName
}

# Hapus folder kosong dari ./src, ./components
Get-ChildItem -Path .\src, .\components -Recurse -Directory | Where-Object { -not ($_.GetFileSystemInfos()) } | ForEach-Object {
    Write-Output "Deleting empty directory: $($_.FullName)"
    Remove-Item $_.FullName
}
