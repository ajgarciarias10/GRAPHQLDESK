import { useState,useEffect } from "react";
 import {ApolloClient,InMemoryCache,ApolloProvider,useQuery,useMutation, useLazyQuery} from '@apollo/client'
import Desk from "../components/desk/desk";
import Header_Nav from "../components/header_nav/header_nav"
import Places_Form from "../components/places_menu/places_menu"
import { w3cwebsocket as W3CWebSocket } from "websocket";
import{cogerPuestosPasandoCiudadYPlanta, cogerPuestosPasandoId} from "../pages/Graphql/Queries"
//region Creacion de puesto
  // import {CREATE_PUESTO} from '../pages/Graphql/Mutations'
//endregion
//region Select query *
  import{cogerPuestos} from '../pages/Graphql/Queries'
//endregion



const Home = () => {
  const client =  new ApolloClient({
    uri:  'http://127.0.0.1:3001/graphql',
    cache: new InMemoryCache()
})
  const [placesData, setPlacesData] = useState(["a","a","a"]);
  const [startTime,setStartTime] = useState();
  const [endTime,setEndTime] = useState();
  const [date, setDate] = useState();
  const [all_desks, setAllDesks] = useState([]);
  
  const city_acron = {
      "Barcelona22@":"BAR",
      "GranadaCEPTS": "GRX",
      "MadridOrduña":"MAD",
      "ValenciaSorolla":"VAL",
  }


  const getPlacesData = (childData) => {
    setPlacesData(childData.split(" - ")); 
    // console.log(childData.split(" - ")[0]);
    loadMap((childData.split(" - "))[0],(childData.split(" - "))[1])
  }

  const getStartTime = (timeData) =>{
    setStartTime(timeData);
  }

  const getEndTime = (timeData) =>{
    setEndTime(timeData);
  }

  const getDate = (date) =>{
    setDate(date);

  }


  function loadMap(building_city,building_floor) {
    let svg_width,svg_height;
    let place = city_acron[(building_city).replace(" ","")];
    // console.log(place);
    if(place == 'BAR'|| place == 'a' ){
      svg_width = 1920;
      svg_height = 473;
    }else if(place == 'GRX'){
      svg_width = 1860;
      svg_height = 643;
    }else if (place == 'MAD'){
      svg_width = 1065;
      svg_height = 650;
    }else if (place == 'MAD' && building_floor == "Planta 3"){
      svg_width = 1206;
      svg_height = 744;
    }else if ( place == 'VAL'){
      svg_width = 1172;
      svg_height = 365;
    }

    place = place + "_" + (building_floor).replace(" ","_");
    // Actuializar ip cuando cambio de orenador
    const client_socket = new W3CWebSocket('ws://192.168.2.218:5050');

    client_socket.onopen = () => {
      console.log("WebSocket Client Connected");
      client_socket.send(JSON.stringify({place:place,svg_width:svg_width,svg_height:svg_height}));
    }

    client_socket.onmessage = (message) => {
      loadDesks(message.data,building_city,building_floor)
      

    }
  }

  const[cogerPuestos,{data}] = useLazyQuery(cogerPuestosPasandoCiudadYPlanta,{
      onCompleted: data => {
        if(typeof data !== 'undefined' ){  
          // console.log(data.cogelPuestosPasandoCiudadYPlanta.cantidadpuestosx)
            if(data.cogelPuestosPasandoCiudadYPlanta.ocupado == true && data.cogelPuestosPasandoCiudadYPlanta.disponibleParcialmente == false){
              th_all_desks.push(<Desk pos_x={data.cogelPuestosPasandoCiudadYPlanta.cantidadpuestosx} pos_y = {data.cogelPuestosPasandoCiudadYPlanta.cantidadpuestosy}  deskStatus={"tu reservado"} 
              tableId={data.cogelPuestosPasandoCiudadYPlanta.id_puesto} building_city={placesData[0]} building_floor={placesData[1]} 
              date={date} start_time={startTime} end_time={endTime} />)
            }else if(data.cogelPuestosPasandoCiudadYPlanta.ocupado == true && data.cogelPuestosPasandoCiudadYPlanta.disponibleParcialmente == true){
              
              th_all_desks.push(<Desk pos_x={data.cogelPuestosPasandoCiudadYPlanta.cantidadpuestosx} pos_y = {data.cogelPuestosPasandoCiudadYPlanta.cantidadpuestosy}  deskStatus={"parcialmente"} 
            tableId={data.cogelPuestosPasandoCiudadYPlanta.id_puesto} building_city={placesData[0]} building_floor={placesData[1]} 
              date={date} start_time={startTime} end_time={endTime} />)  
            }
            else if(data.cogelPuestosPasandoCiudadYPlanta.ocupado == false && data.cogelPuestosPasandoCiudadYPlanta.disponibleParcialmente == true){
              th_all_desks.push(<Desk pos_x={data.cogelPuestosPasandoCiudadYPlanta.cantidadpuestosx} pos_y = {data.cogelPuestosPasandoCiudadYPlanta.cantidadpuestosy}  deskStatus={"parcialmente"} 
            tableId={data.cogelPuestosPasandoCiudadYPlanta.id_puesto} building_city={placesData[0]} building_floor={placesData[1]} 
              date={date} start_time={startTime} end_time={endTime} />)  
            }
            else{
              
              th_all_desks.push(<Desk pos_x={data.cogelPuestosPasandoCiudadYPlanta.cantidadpuestosx} pos_y = {data.cogelPuestosPasandoCiudadYPlanta.cantidadpuestosy}  deskStatus={"disponible"} 
            tableId={data.cogelPuestosPasandoCiudadYPlanta.id_puesto} building_city={placesData[0]} building_floor={placesData[1]} 
              date={date} start_time={startTime} end_time={endTime} />)
            }
          }else{
            th_all_desks.push(<Desk pos_x={data.cogelPuestosPasandoCiudadYPlanta.cantidadpuestosx} pos_y = {data.cogelPuestosPasandoCiudadYPlanta.cantidadpuestosy}  deskStatus={"disponible"} 
            tableId={data.cogelPuestosPasandoCiudadYPlanta.id_puesto} building_city={placesData[0]} building_floor={placesData[1]} 
              date={date} start_time={startTime} end_time={endTime} />)
          }            
  }
});
 
   
    //region  Descomentar para la creacion de la tabla Puesto
    // const[createpuesto,{error}] = useMutation(CREATE_PUESTO);
    // function cargamelaBaseDeDatos(ID,building_city,building_floor,positionx,positiony){
    //   let fechaDeFin ="2022-05-18 15:33:28.000000"
    //   let fechaDeINn ="2022-05-18 08:33:28.000000"
    //   let id_puesto = ID+"_"+building_city+"_"+building_floor
    //   console.log(id_puesto)
          
    //       createpuesto({
    //           variables: {id_puesto: id_puesto ,fecha_de_inicio : fechaDeINn,
    //                     fecha_de_fin : fechaDeFin,
    //                     ocupado : false,
    //                     cantidadpuestosx:positionx,
    //                     cantidadpuestosy:positiony,
    //                     disponibleParcialmente:false,bloqueado:false,ciudad: building_city,
    //                     n_planta: building_floor,observaciones: ""},

    //       })
    // }
  //endregion

  

  const loadDesks = async (positions,building_city,building_floor) =>{
    positions = JSON.parse(positions)
    window.th_all_desks = []

    let i = 0;
    for (const position of positions) {
      
      //region OJO!!! DESCOMENTAR ESTO SOLO UNA VEZ PARA QUE TENER CARGADA LA BASE DE DATOS TENEIS QUE CARGARLA SECCION POR SECCION
        //NO OS PREOCUPEIS SI OS SALE EL ERROR DE DUPLICATED ENTRY ES POR QUE HABEIS DUPLICADO LA INSERCCION PERO LUEGO SE METE SOLO 1
        // cargamelaBaseDeDatos(i,building_city,building_floor,position[0],position[1])
      //endregion
        await cogerPuestos(
        {
          variables:{
            id_puesto:i+"_"+building_city+"_"+building_floor,
            ciudad: building_city, 
            n_planta:building_floor  
          } 
        })
        i++
    }
    setAllDesks(th_all_desks);     
  }



  const renderBuildingMap = () => {
    if (placesData[0] == "Barcelona22@" && placesData[1] == "Planta 2" || placesData[0] == 'a') {
        return <svg width="1920" height="473" viewBox="0 0 2827 573" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2456.86 549.2V572H2601.85M2456.86 549.2H2410.61M2456.86 549.2V429.25H2474.65M2354.57 549.2H2337.67M1752.39 549.2V572H1573.61M1752.39 549.2V429.25H1604.74M1752.39 549.2H1983.66M1440.18 549.2H1491.77V572H1573.61M1399.27 549.2H1282.75M9.36465 429.25L1 511.53H88.1694V572H188.681M9.36465 429.25H151.323M9.36465 429.25L20.6519 318.222M20.6519 318.222H151.323M20.6519 318.222L31.2841 213.638M151.323 213.142L31.2841 213.638M31.2841 213.638L41.9162 109.054H88.1694V1H1026.57M532.022 429.25H456.416V549.2H572.048M572.048 549.2V429.25H807.762V549.2M572.048 549.2H807.762M807.762 549.2H1039.92M860.241 429.25H1039.92V549.2M1039.92 549.2H1282.75M1072.83 429.25H1282.75M1374.36 429.25H1282.75M1282.75 429.25V549.2M1573.61 572V429.25M1983.66 549.2V429.25H2002.34M1983.66 549.2H2216.7M2037.92 429.25H2156.22M2198.02 429.25H2216.7V549.2M2216.7 549.2H2301.2H2337.67M2264.74 429.25H2337.67V549.2M2510.23 429.25H2601.85V572M2601.85 572H2710.37V511.53H2759.29L2771.68 444.12M2771.68 444.12L2774.41 429.25H2802.87L2809.18 345.979M2771.68 444.12H2659.67M2659.67 345.979H2809.18M2809.18 345.979L2817.06 241.891M2659.67 241.891H2817.06M2817.06 241.891L2826 123.924H2710.37V1H2343.01M2171.34 1V158.62H2229.16M2171.34 1H2343.01M2171.34 1H1775.52M2277.19 158.62H2344.79L2343.01 1M1604.74 1V158.62H1667.89M1604.74 1H1775.52M1604.74 1H1205.36M1711.48 158.62H1775.52V1M1026.57 1V158.62H1095.06M1026.57 1H1205.36M1141.32 158.62H1205.36V1M188.681 572H367.467V549.2H339.893V429.25H321.214M188.681 572V429.25H277.629" stroke="black"/>
        </svg> 

    } else if(placesData[0] == "Barcelona 22@" && placesData[1] == "Planta 3"){

        return <svg width="1920" height="473" viewBox="0 0 1415 288" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M1356.16 62.4836V1H1301.89M1356.16 62.4836H1414L1409.53 121.488L1405.59 173.551L1402.43 215.201H1388.2L1386.83 222.638L1380.63 256.355H1356.16V286.601H1301.89H1229.37V275.197H1206.23M1356.16 62.4836V86H1325.5M1178.2 275.197H1169.75H1151.51H1109.24H992.68H877.007V286.601H787.582H746.651V275.197H720.847M700.382 275.197H655M184.298 275.197V286.601H94.8737M184.298 275.197V232.638M184.298 275.197H203.5M286.625 275.197H228.788V222.638H269M286.625 275.197V222.638M286.625 275.197H347.5M404.524 275.197V222.638M404.524 275.197H347.5M404.524 275.197H485M94.8737 286.601H44.6001V256.355H1L5.18381 215.201L10.8294 159.667L16.1474 107.357L21.4654 55.046H44.6001V1H513.969H603.394H612.1M94.8737 286.601V242.638M1242.5 1V86M1242.5 1H1301.89M1242.5 1H1184M1242.5 86H1269.5M1242.5 86H1214.5M1301.89 86V1M1184 86V1M1184 1H1123M1151.51 86H1123V1M1123 1H1086.55H888.574H803.153H737.5M737.5 1V86H709.5M737.5 1H674.8M690.847 86H674.8M670.382 86H674.8M647.5 86H612.1V1M612.1 1H674.8M674.8 1V86M310.5 222.638H347.5M404.524 222.638H357.512H347.5M404.524 222.638H423M347.5 222.638V275.197M441 222.638H485M485 222.638V275.197M485 222.638H529M485 275.197H520.642H550.5M550.5 275.197H642.1H655M550.5 275.197V222.638H629M655 275.197V222.638H693" stroke="black"/>
      </svg>

    }else if (placesData[0] == "Barcelona 22@" && placesData[1] == "Planta 4"){

        return <svg width="1920" height="473" viewBox="0 0 1415 288" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop:'15px',marginLeft:'0px'}}>
            <path d="M1206.23 275.197H1229.37V286.601H1301.89H1356.16V256.355H1380.63L1386.83 222.638L1388.2 215.201H1402.43L1405.59 173.551L1409.53 121.488L1414 62.4836H1356.16V1H1301.89H1242.5H1184H1123H1086.55H888.574H877.007M1178.2 275.197H1169.75H1151.51H1109.24H992.68H877.007V286.601H787.582H746.651V275.197H720.847M700.382 275.197H683.5M228.788 275.197H286.625M184.298 275.197V286.601H94.8737M184.298 275.197H203.5M184.298 275.197H171V222.638H118M286.625 275.197V222.638H275.5M286.625 275.197H317.063M404.524 275.197H347.5H317.063M404.524 275.197V222.638H311.5M404.524 275.197H464M520.642 275.197H485H464M520.642 275.197H550.5H579.5M520.642 275.197V222.638M642.1 275.197H655H683.5M642.1 275.197H579.5M642.1 275.197V222.638H683.5M94.8737 286.601H44.6001V256.355H1L5.18381 215.201L10.8294 159.667L16.1474 107.357L21.4654 55.046H44.6001V1H513.969H603.394H612.1H674.8H706.15M94.8737 286.601V222.638M770.327 1H737.5H706.15M770.327 1H803.153H821.5M770.327 1V76.5M770.327 76.5H795M770.327 76.5H731M821.5 1V76.5M821.5 1H877.007M877.007 1V76.5H841.5M706.15 1V76.5M228.788 269V222.638H259.5M317.063 275.197V247.5M537 222.638H579.5M622 222.638H579.5M579.5 222.638V275.197M683.5 239V275.197M464 275.197V222.638M464 222.638H496M464 222.638H435" stroke="black"/>
          </svg>

    }else if (placesData[0] == "Barcelona 22@" && placesData[1] == "Planta 7"){

        return <svg width="1920" height="473" viewBox="0 0 1415 288" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1206.23 275.197H1229.37V286.601H1301.89H1356.16V256.355H1380.63L1383.82 239M1178.2 275.197H1169.75H1151.51H1109.24H992.68H877.007V286.601H787.582H746.651V275.197H720.847M700.382 275.197H683.5H655H642.1H579.5H550.5H530M228.788 275.197H286.625H317.063H347.5M184.298 275.197V286.601C184.298 286.601 129.796 286.601 94.8737 286.601C75.2407 286.601 44.6001 286.601 44.6001 286.601V256.355H1L5.18381 215.201L10.8294 159.667L16.1474 107.357L21.4654 55.046H44.6001V1H513.969H603.394H612.1H674.8H706.15H737.5H770.327H803.153H821.5H877.007H888.574H1086.55H1123H1184H1242.5H1301.89H1356.16V62.4836H1414L1409.53 121.488L1405.59 173.551L1402.43 215.201H1388.2L1386.83 222.638L1383.82 239M184.298 275.197H203.5M184.298 275.197H171M404.524 275.197H347.5M404.524 275.197H464H485H520.642H530M404.524 275.197V222.638M347.5 275.197V239M404.524 222.638H347.5M404.524 222.638H424M530 55.046V173.551M596 55.046V173.551M655 138.5V62.4836H821.5V138.5M888.574 62.4836V173.551M1008.5 62.4836V173.551M404.524 62.4836V173.551M442 222.638H530M530 222.638V275.197M530 222.638H590M125.5 107.357H44.6001M125.5 55.046V84.5M125.5 121.488V150.994M125.5 180.5V150.994M125.5 150.994H52M1242.5 239H1383.82" stroke="black"/>
      </svg> 

    }else if(placesData[0] == "Granada CEPTS" && placesData[1] == "Planta 1"){

        return <div style={{ marginBottom:'100px', marginLeft:'20px'}}> 
          <svg width="567" height="618" viewBox="0 0 447 498" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M408.5 215.5V215M418.5 205C420 215 408.5 215 408.5 215M408.5 215V205L380 201.327V215.5L222.323 195.177L202.925 254.753L380 273.5V289.5L408.5 294.373V282C408.5 282 420.5 282 420.5 294.373M422.5 205C424 215 435 215.5 435 215.5V205L446 37.79L216.323 20.81L1 1V497H201.011H446V294.373H435V282C435 282 423 282 423 294.373" stroke="#3F3F3F"/>
          </svg>

          <svg width="1303" height="629" viewBox="0 0 923 419" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M222.428 418L232.029 340.5M166 251.323L151.5 332.5L232.029 340.5M166 251.323L53.5 243.291V231C53.5 231 40.5 231 40.5 243.291M166 251.323L243 255.636M232.029 340.5L243 255.636M35.8624 243.291C36.5 231 23.87 231 23.87 231L22.5719 243.291L1 418H270.649H478.578H910.699L922 8.0084L790.179 1L775 256H761C761 256 761 267 773.401 267M243 255.636L451.5 265V276.5V288C451.5 288 465 288 465 276.5M469 276.5C469 288 483.5 288 483.5 288V276.5V265L773.401 285.341L761 281.5C761 281.5 761 273.5 773.401 274.5" stroke="#3F3F3F"/>
          </svg>
        </div>

    }else if (placesData[0] == "Madrid Orduña" && placesData[1] == "Planta 2"){

      return <svg width="1065" height="650" viewBox="0 0 1065 650" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop:'30px',marginLeft:'10px'}}>
        <path d="M844 0.5H1064.5V649.5H844V562H752.5M844 0.5V95.5H752.5M844 0.5H558.5V40.5V95.5H701M701 562H558.5V607.5H545M516.5 607.5H467M516.5 40.5H101.5M558.5 514V504.5M558.5 421H516.5V367.5M558.5 421H602M558.5 421V504.5M516.5 322V270.5M516.5 242V228.5H559.25M602 228.5V421M602 228.5H559.25M602 228.5H790.5M602 421H790.5M743 504.5H558.5M790.5 421V324.75M790.5 421H834.25M790.5 228.5V324.75M790.5 228.5H844M867 228.5H844M878 259V324.75M878 390.5V324.75M878 421H834.25M790.5 324.75H878M559.25 228.5L558.5 141H743M769.5 141H790.5H821H844V228.5M1 463V607.5H187.5M1 463V405.5M1 463H134M187.5 491.5V607.5M187.5 607.5H288M288 607.5V504.5H225.5M288 607.5H379.5M379.5 607.5V504.5H311M379.5 607.5H467M467 607.5V504.5H412M1 405.5H101.5V346.5M1 405.5V228.5M101.5 322V301M101.5 270.5V228.5M101.5 228.5H1M101.5 228.5V190.5M1 228.5V134.5M1 134.5V40.5H101.5M1 134.5H101.5M101.5 40.5V95.5M187.5 463H311V405.5H265.5M187.5 463V405.5H225.5M187.5 463H134M134 463V405.5H162.5M903 567H1023M903 100.5H1023M834.25 421V504.5H769.5" stroke="black"/>
      </svg>

    }else if (placesData[0] == "Madrid Orduña" && placesData[1] == "Planta 3"){
      
      return <svg width="1206" height="744" viewBox="0 0 1206 744" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M618 52H1V691.5H633M618 52V0.5H797V12H823.5V0.5H936V111M618 52H633V111H785.5M936 111H1054L1205 262V484L1054 635H956.5M936 111H835M956.5 635V743H835V733.5H797V743H633V691.5M956.5 635H835M633 691.5V635M633 168H835M633 168V271H682.5M633 168H553M903.5 168H877V216M920.5 168H936L941.5 271H894M877 271V262M877 271H682.5M877 271H894M682.5 271V484M682.5 484H894M682.5 484H633M894 484V271M894 484H941.5V581H920.5M903.5 581H877M835 581H633V484M633 484H513V168M633 623V635M633 635H785.5M47 472.5H125V417.5M125 385V362.5M125 328V271H47M197.5 295.5H275.5V379.5M197.5 459.5H275.5V379.5M197.5 431V379.5M197.5 328V379.5M197.5 379.5H275.5" stroke="black"/>
      </svg>      

    }else if (placesData[0] == "Valencia Sorolla" && placesData[1] == "Planta 10"){

      return <svg width="1172" height="365" viewBox="0 0 1172 365" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M170.5 1H1V172.5L170.5 241.964M170.5 1V163M170.5 1H359M170.5 201V241.964M170.5 241.964L469.5 364.5H1171.5V73.5M359 1V85L410.5 113.5M359 1H541.5M541.5 113.5V1M541.5 1H652M652 1V113.5M652 1H774M652 113.5H585.5M652 113.5H728M774 113.5V1M774 1H1055.5M838.5 113.5V163H1055.5V1M1055.5 1H1171.5V73.5M1101 73.5H1171.5M785 214.5H803.25M785 214.5V258.25M785 214.5L803.25 258.25M821.5 345.5H803.25M821.5 345.5V302M821.5 345.5L803.25 301.875M803.25 214.5H821.5V258.25M803.25 214.5V258.25M803.25 214.5L821.5 258.25M803.25 345.5H785V302M803.25 345.5V301.875M803.25 345.5L785 302M785 302H821.5M785 302V258.25M821.5 302V258.25M821.5 302L803.25 258.25M821.5 258.25H803.25M785 258.25H803.25M785 258.25L803.25 301.875M803.25 258.25V301.875" stroke="black"/>
      </svg>
      
    }

  }
//El componente Apollo Provider se utilza de componentes padres > hijos por lo tanto tiene que estar tanto aqui por que va de index > resvform
  return (
    <ApolloProvider client={client}>
      <div>
            <Header_Nav/>
            <Places_Form getPlacesData={getPlacesData} getStartTime={getStartTime} getEndTime={getEndTime} getDate={getDate} isAdmin={false}/>
            <div style={{position:'absolute',width:'100vw',height:'100vh', top:0,display:"flex"}}>
              <div style={{position:'relative',alignSelf:'center',width:'100vw'}}>
                  {renderBuildingMap()}
                  {all_desks}
              </div>

            </div>
      </div>
    </ApolloProvider>
  );
}

export default Home
