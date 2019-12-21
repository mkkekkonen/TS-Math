yarn build
Remove-Item ..\ui\src\content\mathScripts\*
Copy-Item .\dist\* ..\ui\src\content\mathScripts
