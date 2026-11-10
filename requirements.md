# REQUERIMIENTOS - PROYECTO CLINICA SALUD INTEGRAL

## SPECIALTY

| Atributo | Tipo          | Notas              |
| -------- | ------------- | ------------------ |
| id       | Número Entero | [PK]               |
| name     | Texto         | Obligatorio, Único |

## DOCTOR

| Atributo     | Tipo          | Notas              |
| ------------ | ------------- | ------------------ |
| id           | Número Entero | [PK]               |
| name         | Texto         | Obligatorio        |
| email        | Texto         | Obligatorio, Único |
| phone        | Texto         | Opcional           |
| specialty_id | Número Entero | [FK]               |

## PATIENT

| Atributo   | Tipo          | Notas              |
| ---------- | ------------- | ------------------ |
| id         | Número Entero | [PK]               |
| name       | Texto         | Obligatorio        |
| email      | Texto         | Obligatorio, Único |
| birth_date | Fecha         | Obligatorio        |
| phone      | Texto         | Opcional           |
| created_at | Fecha y Hora  | Obligatorio        |

## APPOINTMENT

| Atributo    | Tipo          | Notas       |
| ----------- | ------------- | ----------- |
| id          | Número Entero | [PK]        |
| date        | Fecha y Hora  | Obligatorio |
| status      | Estado        | Obligatorio |
| description | Texto         | Opcional    |
| doctor_id   | Número Entero | [FK]        |
| patient_id  | Número Entero | [FK]        |

## RELACIONES

- Una especialidad puede tener muchos medicos, per un medico pertenece a una sola especialidad

- Un medico puede tener muchas citas, pero una cita pertenece a un solo medico

- Un paciente puede tener muchas citas, pero una cita pertenece a un solo paciente

- La especialidad es una tabla propia y no como texto dentro de la tabla de doctor, porque asi se pueden ver todas las especialidades de la clinica aunque no haya doctores y se escribe solamente una vez.
