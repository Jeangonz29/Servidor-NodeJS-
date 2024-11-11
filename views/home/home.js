const formC = document.querySelector('#form-create')
const formL = document.querySelector('#form-login')
const createInput = document.querySelector('#create-input')
const noti = document.querySelector('.notification')
const loginInput = document.querySelector('#login-input')


formC.addEventListener('submit', async e=>{ //cuando le agg parentesis es cuando le agg mas de un paramentro comunmente, al e  //debemos hacer conexiones asincronas por eso el async
    e.preventDefault() //evita que se recargue la pagina
    //console.log(!createInput.value)
    const respuesta = await fetch('http://localhost:3000/usuario',{
        method: 'GET' //el get porque solo har una consulta, aqui hay otros tambien como el post
    }) 
 
    const users = await respuesta.json()
    //console.log(users)
//validar
    const user = users.find(user=>user.username===createInput.value) //find es para buscar
    //console.log(user)
 
    if(!createInput.value){
        //si el campo esta vacio 
        console.log('campos vacios')
        noti.innerHTML =  'El campo no puede estar vacio'
        noti.classList.add('show-notification')

        setTimeout(()=>{
            noti.classList.remove('show-notification')
        },2000)
    }else if(user){
        //el caso si existe el usuario
        noti.innerHTML =  'El usuario ya existe'
        noti.classList.add('show-notification')

        setTimeout(()=>{
            noti.classList.remove('show-notification')
        },2000)

    }else{
        //si no existe el usuario, vamos a agg
        //todo esto aqui abajo tambien es un plantilla para crear usuarios

        await fetch('http://localhost:3000/usuario',{
            method: 'POST', //el get porque solo har una consulta, aqui hay otros tambien como el post
            headers:{
                'Content-Type': 'application/json' //este es para registrar, pero hay mas content-Type
            },
            body: JSON.stringify({username:createInput.value})
            //si quiero agg muchos, se agg aqui en el body, adentro 
        })

        const newUser = {                //creo un nuevo objeto
            username: createInput.value
        }
        //const response = await axios.post('/api/users',newUser)
        //axios es otra forma de conectarme como el fecht, y en este caso se pone de ruta el backend
        //mejor manejo de errores que fecht
        //para usar axios neceito instalarlo en el html
        //console.log(response)
        noti.innerHTML =  `El usuario ${createInput.value} se ha creado satisfactoriamente`
        noti.classList.add('show-notification')

        setTimeout(()=>{
            noti.classList.remove('show-notification')
        },2000)

        createInput.value = "" //esto es para resetear y lo colacmos en vacio
    }

})

formL.addEventListener('submit',async e=>{
    e.preventDefault()

    //aqui quiero hacer busqueda, entonces como lo tengo arriba, quiero consultar
    const respuesta = await fetch('http://localhost:3000/usuario',{
        method: 'GET' //el get porque solo har una consulta, aqui hay otros tambien como el post
    })
    const users = await respuesta.json()
    //console.log(users)
    //validar
    const user = users.find(user=>user.username===loginInput.value)
    //console.log(user)
    
    if(!user){
        noti.innerHTML =  'El usuario no existe'
        noti.classList.add('show-notification')

        setTimeout(()=>{
            noti.classList.remove('show-notification')
        },2000)
    }else{
        localStorage.setItem('user',JSON.stringify(user))
        window.location.href = '/tareas'
    }
})