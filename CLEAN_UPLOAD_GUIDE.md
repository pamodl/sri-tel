# Clean Upload Package Guide

## Problem
Your project is over 1 GB because of:
- **frontend/node_modules**: 551 MB (dependencies, auto-generated)
- **frontend/build**: 3 MB (compiled output, auto-generated)
- **springboot-backend/*/target**: ~100-200 MB each (compiled Java, auto-generated)
- **.git folder**: Git history (can be large)

## Solution: Create Clean Package

### Option 1: Remove Only node_modules & Build (EASIEST)

**Run these commands:**

```powershell
cd "C:\Users\Lakshan\Desktop\cs_spc_4_2\SOC\assignment sri tel"

# Remove frontend dependencies and build
Remove-Item -Recurse -Force "frontend\node_modules"
Remove-Item -Recurse -Force "frontend\build"

# Remove backend compiled classes (if present)
Get-ChildItem -Path "springboot-backend" -Directory -Recurse | Where-Object {$_.Name -eq "target"} | ForEach-Object {
    Remove-Item -Recurse -Force $_.FullName
}
```

**Result:** Project size drops from 1GB+ to ~100 MB

**What remains:**
- ✓ All source code (package.json, pom.xml, .java files, .js files)
- ✓ Configuration files (docker-compose, .env, etc.)
- ✓ Documentation (README, scripts)
- ✓ Presentation files (PDFs, scripts)
- ✗ Dependencies (can be reinstalled with `npm install` and `mvn clean install`)

### Option 2: Complete Clean Package (MOST PROFESSIONAL)

Best for LMS submission - removes everything non-essential:

```powershell
cd "C:\Users\Lakshan\Desktop\cs_spc_4_2\SOC\assignment sri tel"

# Remove all auto-generated files
Remove-Item -Recurse -Force "frontend\node_modules"
Remove-Item -Recurse -Force "frontend\build"
Remove-Item -Recurse -Force ".git"

# Remove Maven cache (.m2)
$m2 = "$env:USERPROFILE\.m2"
if (Test-Path $m2) {
    Remove-Item -Recurse -Force $m2
}

# Remove all target folders
Get-ChildItem -Path "springboot-backend" -Directory -Recurse -Filter "target" | ForEach-Object {
    Remove-Item -Recurse -Force $_.FullName
}

# Remove IDE artifacts
Get-ChildItem -Path "." -Directory -Recurse -Filter ".idea" | ForEach-Object {
    Remove-Item -Recurse -Force $_.FullName
}
```

### After Cleanup: How to Restore

Receivers of your code can rebuild everything:

**Frontend:**
```powershell
cd frontend
npm install
npm run build
```

**Backend:**
```powershell
cd springboot-backend/user-service
mvn clean install
```

---

## Verification

After running cleanup, verify size:

```powershell
$size = (Get-ChildItem -Recurse -File | Measure-Object -Property Length -Sum).Sum
Write-Host "Project size: $([math]::Round($size/1MB, 2)) MB"
```

Should be around **50-150 MB** instead of 1GB+.

---

## What to Include in ZIP for LMS

Before uploading, make sure your ZIP includes:

✓ All source code (.java, .js, .jsx, .sql files)  
✓ Configuration files (docker-compose.yml, .env, pom.xml, package.json)  
✓ Documentation (README.md, SPEAKER scripts, guides)  
✓ Presentation files (PDFs, markdown)  
✗ node_modules  
✗ build/  
✗ target/  
✗ .git/  
✗ .idea/  
✗ .vscode/ (optional - IDE configs)  

---

## Quick Commands to Copy & Run

**Minimal cleanup (removes only node_modules & builds):**
```powershell
Remove-Item -Recurse -Force "C:\Users\Lakshan\Desktop\cs_spc_4_2\SOC\assignment sri tel\frontend\node_modules"
Remove-Item -Recurse -Force "C:\Users\Lakshan\Desktop\cs_spc_4_2\SOC\assignment sri tel\frontend\build"
Get-ChildItem -Path "C:\Users\Lakshan\Desktop\cs_spc_4_2\SOC\assignment sri tel\springboot-backend" -Directory -Recurse -Filter "target" | ForEach-Object { Remove-Item -Recurse -Force $_.FullName }
```

**Check final size:**
```powershell
cd "C:\Users\Lakshan\Desktop\cs_spc_4_2\SOC\assignment sri tel"
$size = (Get-ChildItem -Recurse -File | Measure-Object -Property Length -Sum).Sum
"Project size: $([math]::Round($size/1MB, 2)) MB"
```

---

## Why This Works

- **node_modules**: Created from `package.json` + `npm install`
- **build/**: Created from `npm run build`
- **target/**: Created from `mvn clean package`
- **.git/**: Just version history, not needed for submission

These can all be recreated from the source files.

---

## For LMS Upload

1. Run cleanup commands above
2. Add file to ZIP: `Project-submission.zip`
3. Upload to LMS
4. Size should be under 200 MB
5. Include README with rebuild instructions
