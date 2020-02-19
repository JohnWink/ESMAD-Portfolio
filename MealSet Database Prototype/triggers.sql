delimiter $$
create trigger log_reserva after insert on mealset.reserva
for each row
begin


insert into histórico_reservas values(null,NEW.idCliente,NEW.idRestaurante,NEW.idMesa,NEW.horario,current_timestamp() ,"Adicionado Pedido de Reserva");  

end $$
delimiter ; 

delimiter $$
create trigger log_reserva_Confirmação after update on mealset.reserva
for each row
begin
IF(NEW.confirmado = 1) THEN 
	insert into histórico_reservas values(user(),NEW.idCliente,NEW.idRestaurante,NEW.idMesa,NEW.horario,current_timestamp() ,"Reserva confirmada");  
END IF;
end $$
delimiter ; 

delimiter $$
create trigger log_reserva_Rejeição after delete on mealset.reserva
for each row
begin
IF(OLD.confirmado = 0) THEN 
	insert into histórico_reservas values(user(),OLD.idCliente,OLD.idRestaurante,OLD.idMesa,OLD.horario,current_timestamp() ,"Reserva Rejeitada");  
END IF;
end $$
delimiter ;


delimiter $$
create trigger log_reserva_RejeiçãoAposConfirmação after delete on mealset.reserva
for each row
begin
IF(OLD.confirmado = 1) THEN 
	IF(OLD.horario > current_timestamp()) THEN
		insert into histórico_reservas values(user(),OLD.idCliente,OLD.idRestaurante,OLD.idMesa,OLD.horario,current_timestamp() ,"AVISO: Reserva removida após confirmação MAS antes do horario planeado");  
    END IF;
END IF;
end $$
delimiter ;







