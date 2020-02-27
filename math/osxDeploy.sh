rm -r ./dist
yarn build
rm ../ui/src/content/mathScripts/*
cp ./dist/* ../ui/src/content/mathScripts
cp ./dist/* ../react-front/public/mathScripts
