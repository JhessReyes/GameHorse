
function Reset(){
    clearInterval(cronometro);
}
var segundos
function Start(){
    segundos = 0;
    seg = document.getElementById("segun");
    min = document.getElementById("minut");
    cronometro = setInterval(function(){
        segundos++;

        segs = segundos;
        minu = 0;

        while (segs>=60) {
            minu++;
            segs -=60;            
        }

        if(minu<10) min.innerHTML = "0" +minu;
        else min.innerHTML = minu;
        
        if(segs<10) seg.innerHTML = "0" +segs;
        else seg.innerHTML = segs;

        Total_m = minu;
        Total_s = segs;
    },1000)
}


var bloqueselec_x;
var bloqueselec_y;
var mano = false;
var dif_x;
var dif_y;
var Total_s;
var Total_m;
var cronometro;

var board = new Array(5);
function Matriz(){
    for(let i=0;i<6;i++) board[i] = new Array(6);
  clearTablero();
  deselect(0,0);
    BloqueOcupadoCaballo();
}

function BloqueOcupadoCaballo(){
    for(i=0; i<5; i++){
        for(j=0; j<5; j++){
            board[i][j]=0;
        }
    }
    board[2][2]=2;
    PaintBlacksHorses(2,2);
    board[5][5]=1;
    PintarPeonBlanco(5,5);
}

function positionHorse (){
    for(i=0; i<5; i++){
        for(j=0; j<5; j++){
            if(board[i][j]==2){
                mapeo(i,j);
            }
        }
    }
}


function mapeo(x,y){
    time = 0;
    //cron = setInterval(function(){
        
        time++;
        t = time;
            var p_x=0;
            var p_y=0;
            for(i=0; i<5; i++){
                for(j=0; j<5; j++){
                    dif_x = i - x; /*DIFERENCIA EJE X DEL ACTUAL Y EL ANTERIOR */
                    dif_y = j - y; /*DIFERENCIA EJE Y DEL ACTUAL Y EL ANTERIOR */
                        
                       // alert("Balio kk")
                        if(((dif_x*dif_x) + (dif_y*dif_y) ==5)){
                            valor = document.getElementById("b"+i+j).innerText;
                            if(valor=="♙"){
                                //setTimeout(function() { PintarBloque(i,j,"red"); },1000);
                                colaEfectos(i,j,"red");
                                p_x = i;
                                p_y = j;
                            }else{
                                //setTimeout(function() { PintarBloque(i,j,"black"); },1000);
                                
                                colaEfectos(i,j,"black");
                                
                            }
                           
                        }
                        if(i==4 && j ==4 ){
                         //  clearInterval(cron);
                           t=0;
                        }
                }
            }
        

            valor = document.getElementById("b"+p_x+p_y).innerText;
            if(valor=="♙"){
                mano=false;
                board[bloqueselec_x][bloqueselec_y]=0;
                board[p_x][p_y] = 2;
                setTimeout(function() { PaintBlacksHorses(p_x,p_y) },4000); 
//                PaintBlacksHorses(p_x,p_y);   
                setTimeout(function() { eliminarpieza(x,y)},4000); 
                //eliminarpieza(x,y);
                setTimeout(function() { deselect(x,y)},4000);
            }
            
    //},100)
}

function CheckBloque(x,y){    
    valor = document.getElementById("b"+x+y).innerText;
    CheckBlackHorse(x,y);

    $(document).ready(function(){
        colaEfectos();
        });

} /*FUNCION PRICIPAL PARA CHECKEAR UNA POSICION EN LA MATRIZ */

function play(){
    Reset();
    Matriz();
    Start();
}


function CheckBlackHorse(x,y){
        if(valor == "♞" && mano==false && board[x][y] == 2){ /*SI ES UN CABALLO NEGRO, EXISTE UNA PIEZA Y NO SE HA AGARRADO */
            deselect(x,y);
            mano=true; 
            bloqueselec_x = x;
            bloqueselec_y = y;
           mapeo(x,y)
        }else  CheckPeonBlanco(x,y);
        
        if(mano == true && board[x][y] == 0|| mano == true && valor == "♙"){ /*SI YA SE AGARRO Y EL BLOQUE ESTA VACÍO*/
            dif_x = x - bloqueselec_x; /*DIFERENCIA EJE X DEL ACTUAL Y EL ANTERIOR */
            dif_y = y - bloqueselec_y; /*DIFERENCIA EJE Y DEL ACTUAL Y EL ANTERIOR */
            b = document.getElementById("b"+bloqueselec_x+bloqueselec_y).innerText;
            if(b == "♞" ){
                if(((dif_x*dif_x) + (dif_y*dif_y) ==5)){
                    mano=false;
                    board[bloqueselec_x][bloqueselec_y]=0;
                    board[x][y] = 2; 
                    PaintBlacksHorses(x,y); 
                    eliminarpieza(bloqueselec_x,bloqueselec_y);
                    deselect(x,y);
                }else deselect(x,y);
            }
        }
}

function Insert(x,y){
    if(mano==false){
        mano=true; 
        bloqueselec_x = x;
        bloqueselec_y = y;
//        colaEfectos(x,y,"red")
        PintarBloqueInicial(x,y,"#008CBA", "#ffffff")
    }
}

function CheckPeonBlanco(x,y){
        if(valor == "♙" && mano==false && board[x][y] == 1){ /*SI ES UN PEON BLANCO EXISTE UNA PIEZA Y NO SE HA AGARRADO */
            mano=true; 
            bloqueselec_x = x;
            bloqueselec_y = y;
            PintarBloque(x,y,"green")
        }
        if(mano == true && board[x][y] == 0){ /*SI YA SE AGARRO Y EL BLOQUE ESTA vACÍO*/
            b = document.getElementById("b"+bloqueselec_x+bloqueselec_y).innerText;
            if(b == "♙" ){    
                mano=false;incio = false;
                if(bloqueselec_x!=5 && bloqueselec_y !=5){
                    board[bloqueselec_x][bloqueselec_y]=0;
                    eliminarpieza(bloqueselec_x,bloqueselec_y);
                }
                board[x][y] = 1; 
                PintarPeonBlanco(x,y); 
                deselect(x,y);
                positionHorse();                
            }
        }else if (mano == true && board[x][y] == 2) deselect(x,y); 
}       

function deselect(x,y){ 
    mano=false;
    for(x=0; x<5; x++){
        for(y=0; y<5; y++){
            PintarBloque(x,y,"transparent");
        }
    }
    PintarBloqueInicial(5,5,"#ffffff","#008CBA");
}/*Funcion para deseleccionar el borde*/

function clearTablero() {
    for(x=0; x<5; x++){
        for(y=0; y<5; y++){
            eliminarpieza(x,y);
        }
    }
}

function eliminarpieza(bloqueselec_x,bloqueselec_y){ 
        valor = document.getElementById("b"+bloqueselec_x+bloqueselec_y);
        valor.innerHTML="<span></span>";
        board[bloqueselec_x][bloqueselec_y]=0;
 }/*FUNCION QUE TOMA DE ENTRADA EL BLOQUE ANTERIOR Y ELIMINA SU CONTENIDO */

function PintarBloque(x,y,borderColor){ 
    Bloque = document.getElementById("b"+x+y);
    Bloque.style.borderColor = borderColor;

}/* CUANDO SE LLAMA ESTA FUNCION PINTA LOS BLOQUES DESEADOS */

function PintarBloqueInicial(x,y,backColor,color){ 
    Bloque = document.getElementById("b"+x+y);
    Bloque.style.color = color;
    Bloque.style.backgroundColor = backColor;
}/* CUANDO SE LLAMA ESTA FUNCION PINTA LOS BLOQUES DESEADOS */

function PintarPeonBlanco(x,y){
    Bloque = document.getElementById("b"+x+y);
    Bloque.innerHTML = "<span>&#x2659;</span>";
} /*PINTA EN LA PANTALLA SEGUN SU POSICION EL PEON BLANCO*/   
function PaintBlacksHorses(x,y){
    Bloque = document.getElementById("b"+x+y);
    Bloque.innerHTML = "<span>&#x265E;</span>";
}

function colaEfectos(x,y,color){
    capa = $("#b"+x+y)
    Bloque = document.getElementById("b"+x+y);
    capa.fadeTo(1500, 0.3).delay(1000).fadeTo(500, 1);
    Bloque.style.borderColor = color
    //alert (capa.queue().length) 
 }


play();