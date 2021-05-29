export async function getData() {

// 	const serviceID = "a852585e-bf4c-437f-a807-95963d1ec6d0";
// 	const query = `SELECT * from "${serviceID}" WHERE NIL LIKE 'Adriano'`;

	const urlSearch = `https://dati.comune.milano.it/api/3/action/datastore_search_sql?sql=SELECT "Nil", sum("Ipotesi_bassa") from "56785ec1-c950-489f-b8ad-e134b6193198" WHERE "Anno"=2021 GROUP BY "Nil"`;
	console.log(urlSearch);
	const response = await fetch(urlSearch);
	//console.log(response);
	//const data = await response.json();
	//console.log(data);
	//return data;
	return response;
	

// 	const result = await fetch
}



/*
OK:

	DATI CONSOLIDATI
	// DATI DELL'ANNO 2017
	https://dati.comune.milano.it/api/3/action/datastore_search_sql?sql=SELECT * from "a852585e-bf4c-437f-a807-95963d1ec6d0" WHERE "Anno"=2017
	
	//DATI DEL QUARTIERE ADRIANO (NOTA LA DICITURA DIVERSA DAL SOLITO)
	https://dati.comune.milano.it/api/3/action/datastore_search_sql?sql=SELECT * from "a852585e-bf4c-437f-a807-95963d1ec6d0" WHERE "NIL" LIKE 'Adriano (17)'
	https://dati.comune.milano.it/api/3/action/datastore_search_sql?sql=SELECT * from "a852585e-bf4c-437f-a807-95963d1ec6d0" WHERE ("NIL" LIKE 'Adriano (17)') AND ("Anno"=2019)
	
	
	// FAMIGLIE PER NIL NEL 2019
	https://dati.comune.milano.it/api/3/action/datastore_search_sql?sql=SELECT "NIL", sum("Famiglie") from "a852585e-bf4c-437f-a807-95963d1ec6d0" WHERE "Anno"=2019 GROUP BY "NIL"
	
	
	// ANNI PRESENTI NELLA TABELLA
	https://dati.comune.milano.it/api/3/action/datastore_search_sql?sql=SELECT "Anno" from "a852585e-bf4c-437f-a807-95963d1ec6d0" GROUP BY "Anno"
 	// NIL PRESENTI NELLA TABELLA
 	https://dati.comune.milano.it/api/3/action/datastore_search_sql?sql=SELECT "NIL" from "a852585e-bf4c-437f-a807-95963d1ec6d0" GROUP BY "NIL"
	
 
 	PROZIEZIONI
	// 56785ec1-c950-489f-b8ad-e134b6193198
	// PRIMI CINQUE RECORD (UTILE PER CAPIRE COME È FATTO IL DATASET)
	https://dati.comune.milano.it/api/3/action/datastore_search?resource_id=56785ec1-c950-489f-b8ad-e134b6193198&limit=5

	// ANNI PRESENTI NELLA TABELLA
	https://dati.comune.milano.it/api/3/action/datastore_search_sql?sql=SELECT "Anno" from "56785ec1-c950-489f-b8ad-e134b6193198" GROUP BY "Anno"
	
	// NIL PRESENTI NELLA TABELLA
	https://dati.comune.milano.it/api/3/action/datastore_search_sql?sql=SELECT "Nil" from "56785ec1-c950-489f-b8ad-e134b6193198" GROUP BY "Nil"
	
	// PROIEZIONI
	https://dati.comune.milano.it/api/3/action/datastore_search_sql?sql=SELECT "Nil", sum("Ipotesi_alta") from "56785ec1-c950-489f-b8ad-e134b6193198" WHERE "Anno"=2021 GROUP BY "Nil"
	https://dati.comune.milano.it/api/3/action/datastore_search_sql?sql=SELECT "Nil", sum("Ipotesi_media") from "56785ec1-c950-489f-b8ad-e134b6193198" WHERE "Anno"=2021 GROUP BY "Nil"
	https://dati.comune.milano.it/api/3/action/datastore_search_sql?sql=SELECT "Nil", sum("Ipotesi_bassa") from "56785ec1-c950-489f-b8ad-e134b6193198" WHERE "Anno"=2021 GROUP BY "Nil"
*/


// 56785ec1-c950-489f-b8ad-e134b6193198