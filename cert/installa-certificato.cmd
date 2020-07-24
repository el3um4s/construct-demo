@echo off
echo.
echo Installa certificato sul PC
pause.
@mkcert.exe --install
echo.
echo installazione completata
pause
echo.
echo Crea certificato per il PC
@mkcert.exe localhost
echo.
echo Certificato creato
pause
