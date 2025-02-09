# TFG-Frontend
Crear una aplicación serverless con AWS y react native

Flujo: Repositorio → Pipeline → Deploy en dev → Tests → Deploy en prod.

Comprobar plantilla

aws cloudformation validate-template --template-body file://ruta/a/tu/plantilla.yaml

lujo de la Aplicación
Publicación de Job

Usuario (persona que necesita la tarea): Publica un job o tarea en la plataforma.
Se guarda la información del job en la base de datos (por ejemplo, en DynamoDB).
Aplicación de Trabajadores

Trabajador 1 y Trabajador 2 (o más) revisan la tarea publicada y deciden aplicar.
Cada vez que un trabajador aplica, se crea un registro de application (una solicitud) asociado al job.
Estos registros podrían guardarse también en DynamoDB o en una tabla separada para las aplicaciones.
Selección del Trabajador

El cliente o sistema selecciona a uno de los trabajadores entre las aplicaciones recibidas.
En el momento de la selección, se elimina (o se marca como inactiva) el resto de las aplicaciones, de modo que quede únicamente la solicitud del trabajador seleccionado.
Creación de la Activity

Una vez elegido el trabajador, se crea una activity (actividad) que representa el trabajo en ejecución.
Esta activity es el registro único que permanecerá, ya que el job se modificará (por ejemplo, se marca como “en curso”) y se asocia a la activity.
Durante o después de la actividad, se pueden guardar reviews o valoraciones del trabajador (y posiblemente del cliente), las cuales también se almacenan para futuras referencias.
