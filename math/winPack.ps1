Remove-Item -r ./dist
yarn build
Remove-Item *.tgz
yarn pack
Remove-Item ../react-front/*.tgz
Copy-Item *.tgz ../react-front
