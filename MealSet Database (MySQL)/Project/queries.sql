/*Filtrar Restaurantes por ordem alfabética */
SELECT restaurante.*, rating_restaurante.rating FROM restaurante, rating_restaurante
WHERE restaurante.idRestaurante = rating_restaurante.Restaurante_idRestaurante
ORDER BY restaurante.nome;

/*Filtrar restaurantes que Têm esplanada*/
SELECT restaurante.*, mesa.*  FROM restaurante, mesa
WHERE restaurante.idRestaurante = mesa.idRestaurante
AND mesa.esplanada = 1
ORDER BY restaurante.nome;

/*Filtrar restaurantes que Têm zona de fumadores*/
SELECT restaurante.*, mesa.*  FROM restaurante, mesa
WHERE restaurante.idRestaurante = mesa.idRestaurante
AND mesa.fumadores = 1
ORDER BY restaurante.nome;


