export default function leave(message, connection) {
    try {
        connection.destroy();
    } catch (err) {
        if(err == "ReferenceError: connection is not defined"){
            message.channel.send( "Avent de vouloir déconnecter le bot connecte le à un chanel vocal avec la commande {" + prefix + "join} :expressionless:");
        } else {
            message.channel.send( err + " :expressionless:" );
        }
    }
}