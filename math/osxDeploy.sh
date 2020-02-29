rm -r ./dist
yarn build
rm ../ui/src/content/mathScripts/*
rm ../react-front/src/mathScripts/*
cp ./dist/* ../ui/src/content/mathScripts
cp ./dist/* ../react-front/src/mathScripts
