yarn build --mode development
Remove-Item ..\ui\src\content\mathScripts\*
Copy-Item .\dist\* ..\ui\src\content\mathScripts
