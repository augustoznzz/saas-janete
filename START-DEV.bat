@echo off
echo ========================================
echo Parando processos Node.js anteriores...
echo ========================================
powershell -Command "Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue"
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo Limpando cache do Next.js...
echo ========================================
if exist "janetezuanazzi\.next" (
    rmdir /s /q "janetezuanazzi\.next"
)

echo.
echo ========================================
echo Configurando variavel de ambiente...
echo ========================================
SET NEXT_PUBLIC_IDENTITY_GOTRUE_URL=

echo.
echo ========================================
echo Iniciando Netlify Dev
echo ========================================
echo.
echo O servidor estara disponivel em:
echo.
echo     http://localhost:8888
echo.
echo Aguarde o servidor iniciar...
echo ========================================
echo.
cd /d E:\projetos\janetezuanazzi
npm run dev
pause

