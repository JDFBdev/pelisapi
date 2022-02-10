# pelisapi

# Git

git add . = informa sobre nuevos archivos o cambios al git

git commit = informa a git que me cometo a enviar estos archivos porque estan redy fredy

git push = los envio

git branch [branch name] = creo una nueva rama

git checkout [branch name] = nombre de la rama a la que me voy a cambiar

git pull origin main = traigo cambios de otra rama a la rama actual


# React hooks

Component Did mount

useEffect(() => {
    console.log('This component has been mounted');
}, []);

Component Did update

useEffect(() => {
    console.log('First time or the counter has been updated');
}, [count]);

Component Will umount

useEffect(() => {
    return () => console.log('this component has been removed');
}, []);



To-do:

-Peli no se favee 2 veces
-Mostrar q ya esta faveada, no te deje clickearlo
-Meter pelis en el session storage
-Traer peliculas populares al inicio
-Traer descripciones a las cards (opcional)
-Estilos
-Dark mode
-Responsiveness
-Cleanup