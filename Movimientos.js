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
    for(let i=0;i<5;i++) board[i] = new Array(5);
    BloqueOcupadoCaballo();
}

function BloqueOcupadoCaballo(){
    for(i=0; i<5; i++){
        for(j=0; j<5; j++){
            board[i][j]=0;
        }
    }
    board[2][2]=2;
    board[1][3]=1;
}

function mapeo(x,y){
    for(i=0; i<5; i++){
        for(j=0; j<5; j++){
            dif_x = i - x; /*DIFERENCIA EJE X DEL ACTUAL Y EL ANTERIOR */
            dif_y = j - y; /*DIFERENCIA EJE Y DEL ACTUAL Y EL ANTERIOR */
            if(((dif_x*dif_x) + (dif_y*dif_y) ==5)){
                valor = document.getElementById("b"+i+j).innerText;
                if(valor=="♙"){
                    bloqueselec_x = x;
                    bloqueselec_y = y;
                    CheckBlackHorse(i,j);
                    PintarBloque(i,j,"red");
                }else{
                    PintarBloque(i,j,"black");
                }
            }
        }
    }
}

function CheckBloque(x,y){    
    valor = document.getElementById("b"+x+y).innerText;
    CheckBlackHorse(x,y);

} /*FUNCION PRICIPAL PARA CHECKEAR UNA POSICION EN LA MATRIZ */
function play(){
    Matriz();
}


function CheckBlackHorse(x,y){
    
    checktrue=false;
        if(valor == "♞" && mano==false && board[x][y] == 2){ /*SI ES UN CABALLO NEGRO, EXISTE UNA PIEZA Y NO SE HA AGARRADO */
            mano=true; 
            bloqueselec_x = x;
            bloqueselec_y = y;
            mapeo(x,y);
        }else  CheckPeonBlanco(x,y);
        if(mano == true && board[x][y] == 0|| mano == true && valor == "♙"){ /*SI YA SE AGARRO Y EL BLOQUE ESTA VACÍO*/
            dif_x = x - bloqueselec_x; /*DIFERENCIA EJE X DEL ACTUAL Y EL ANTERIOR */
            dif_y = y - bloqueselec_y; /*DIFERENCIA EJE Y DEL ACTUAL Y EL ANTERIOR */
            b = document.getElementById("b"+bloqueselec_x+bloqueselec_y).innerText;
            if(b == "♞" ){
                if(((dif_x*dif_x) + (dif_y*dif_y) ==5)) checktrue = true;
                if(checktrue){
                    mano=false;
                    board[bloqueselec_x][bloqueselec_y]=0;
                    board[x][y] = 2; 
                    PaintBlacksHorses(x,y); 
                    eliminarpieza(bloqueselec_x,bloqueselec_y);
                    deselect(x,y);
                }
            }
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
                mano=false;
                board[bloqueselec_x][bloqueselec_y]=0;
                board[x][y] = 1; 
                PintarPeonBlanco(x,y); 
                eliminarpieza(bloqueselec_x,bloqueselec_y);
                deselect(x,y);
            }
        }
}       

function deselect(x,y){ 
    mano=false;
    for(x=0; x<5; x++){
        for(y=0; y<5; y++){
            PintarBloque(x,y,"transparent");
        }
    }
}/*Funcion para deseleccionar el borde*/

function eliminarpieza(bloqueselec_x,bloqueselec_y){ 
        valor = document.getElementById("b"+bloqueselec_x+bloqueselec_y);
        valor.innerHTML="<span></span>";
 }/*FUNCION QUE TOMA DE ENTRADA EL BLOQUE ANTERIOR Y ELIMINA SU CONTENIDO */

function PintarBloque(x,y,borderColor){ 
    Bloque = document.getElementById("b"+x+y);
    Bloque.style.borderColor = borderColor;
}/* CUANDO SE LLAMA ESTA FUNCION PINTA LOS BLOQUES DESEADOS */
function PintarPeonBlanco(x,y){
    Bloque = document.getElementById("b"+x+y);
    Bloque.innerHTML = "<span>&#x2659;</span>";
} /*PINTA EN LA PANTALLA SEGUN SU POSICION EL PEON BLANCO*/   
function PaintBlacksHorses(x,y){
    Bloque = document.getElementById("b"+x+y);
    Bloque.innerHTML = "<span>&#x265E;</span>";
}
play();