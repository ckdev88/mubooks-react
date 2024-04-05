cd ~/Coding/mubooks-react && 
git add . && 
echo 'Commit message:'
read MSG
git commit -m "$MSG" &&  
git push &&
yarn build --base=/mubooks/ && 
cd dist && 
cp . ~/Coding/ckdev88/ckdev88.github.io/mubooks -r && 
cd ~/Coding/ckdev88/ckdev88.github.io/mubooks && 
git add . && 
git commit -m "mubooks: $MSG" && 
git push && 
cd ~/Coding/mubooks-react

