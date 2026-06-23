$ErrorActionPreference = "Stop"
$Supabase = (Resolve-Path (Join-Path $PSScriptRoot "..\node_modules\.bin\supabase.cmd")).Path

function Invoke-CheckedCommand {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Command,

        [Parameter(ValueFromRemainingArguments = $true)]
        [string[]]$Arguments
    )

    & $Command @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed with exit code ${LASTEXITCODE}: $Command $($Arguments -join ' ')"
    }
}

try {
    Invoke-CheckedCommand $Supabase start --exclude "edge-runtime,imgproxy,logflare,mailpit,postgres-meta,realtime,storage-api,studio,supavisor,vector"
    Invoke-CheckedCommand $Supabase db reset
    Invoke-CheckedCommand $Supabase db lint --local --level warning --fail-on error

    $statusLines = & $Supabase status -o env `
        --override-name api.url=SUPABASE_URL `
        --override-name auth.anon_key=SUPABASE_ANON_KEY `
        --override-name auth.service_role_key=SUPABASE_SERVICE_ROLE_KEY

    if ($LASTEXITCODE -ne 0) {
        throw "Unable to read the local Supabase environment."
    }

    foreach ($line in $statusLines) {
        if ($line -match '^([A-Z0-9_]+)=(.*)$') {
            $name = $Matches[1]
            $value = $Matches[2].Trim().Trim('"')
            Set-Item -Path "Env:$name" -Value $value
        }
    }

    Invoke-CheckedCommand node scripts/validate-supabase-m0.mjs
}
finally {
    & $Supabase stop --no-backup | Out-Null
}
