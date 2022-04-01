const http = require("http");
const url = require('url');
const fs = require('fs');

const usuarios = new Map();

const hostname = 'localhost';
const port = 8000;


const server = http.createServer((req,res) => {
    const path = req.url;
   
 

    if(path=== '/login.html' || path === '/') {
      
      const index = fs.readFile(`${__dirname}/views/login.html`,'utf-8',(err,data)=>{
            if(err) {
                res.end('ERROR');
            }else {
                res.end(data);
            }
        });


    }else if (path === '/js/login.js') {
      
        let datos = '';
        req.on('data', chunk => {
            console.log(`Data chunk available: ${chunk}`)
            datos += chunk
            
            let tope = datos.indexOf("&");
            let email = datos.substring(6,tope);
            let password = datos.substring(tope+10,datos.length);
            console.log(email);
            console.log(password);

            for (let [key,value] of usuarios) {
                if (key === email && value === password) {
                    console.log("Usuarios validado");

                    res.writeHead(301, {
                        Location: `http://localhost:8000/salas.html`
                      }).end()

                } else {
                    res.writeHead(301, {
                        Location: `http://localhost:8000/login.html`
                      }).end()
                }

            }

             

          })
          
 
      

    }else if (path === '/register.html') {
        const index = fs.readFile(`${__dirname}/views/register.html`,'utf-8',(err,data)=>{
            if(err) {
                res.end('ERROR');
            }else {
                res.end(data);
            }
        });

    }else if (path === '/js/register.js') {
        let datos = '';
        req.on('data', chunk => {
            console.log(`Data chunk available: ${chunk}`)
            datos += chunk
            let inicio = datos.indexOf("&");
            let inipass = datos.indexOf("&password=");
            let fin = datos.indexOf("&email2=");
            let finpass = datos.indexOf("&avatar");
            let email = datos.substring(inicio+7,fin);
            let password = datos.substring(inipass+10,finpass);
            console.log(email);
            console.log(password);

            if (typeof window !== 'undefined') {
                console.log('You are on the browser');
            }
            else {
                console.log("You are on the server");

                res.writeHead(301, {
                Location: `http://localhost:8000/login.html`
                }).end()
            }
            //alert("Usuario registrado correctamente");
            
            //almacenar email y password para comprobar login

            usuarios.set(email,password);

            for (let [key,value] of usuarios) {
                console.log(key+ '--'+value);
            }

    })
    
    } else if (path === '/salas.html') {
        
        const index = fs.readFile(`${__dirname}/views/salas.html`,'utf-8',(err,data)=>{
            if(err) {
                res.end('ERROR');
            }else {
                res.end(data);
            }
        });
    }
    
    else{
        res.writeHead(404);
        res.end('Página no encontrada');
    }

});


server.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});

