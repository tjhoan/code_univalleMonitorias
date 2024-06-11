CREATE DATABASE monitoriasUnivalle;

USE monitoriasUnivalle;

CREATE TABLE estudiante (
        codigo_estudiante VARCHAR(13) NOT NULL UNIQUE PRIMARY KEY,
        nombre_estudiante VARCHAR(50) NOT NULL,
        apellido_estudiante VARCHAR(50) NOT NULL,
        password_estudiante VARCHAR(50) NOT NULL,
        email_estudiante VARCHAR(50) NOT NULL UNIQUE,
        carrera_estudiante VARCHAR(50) NOT NULL,
        sede_estudiante VARCHAR(50) NOT NULL,
        semestre_estudiante VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

INSERT INTO estudiante (codigo_estudiante, nombre_estudiante, apellido_estudiante, password_estudiante, email_estudiante, carrera_estudiante, sede_estudiante, semestre_estudiante)
VALUES
('2262001', 'Pedro', 'Gómez', 'password123', 'estudiante1@example.com', 'tecnologia_desarrollo_software', 'Cali', 'Primero'),
('2262002', 'Laura', 'Martínez', 'securepass', 'estudiante2@example.com', 'ingieneria_sistemas', 'Pacifico', 'Segundo'),
('2262003', 'Alejandro', 'Pérez', '123456', 'estudiante3@example.com', 'ingieneria_informatica', 'Palmira', 'Tercero'),
('2262004', 'Sofía', 'Sánchez', 'pass123', 'estudiante4@example.com', 'ingieneria_industrial', 'Zarzal', 'Cuarto'),
('2262005', 'Lucía', 'López', 'qwerty', 'estudiante5@example.com', 'ingieneria_electronica', 'Caicedonia', 'Quinto'),
('2262006', 'Juan', 'Rodríguez', 'student123', 'estudiante6@example.com', 'administracion_empresas', 'Buga', 'Sexto'),
('2262007', 'María', 'García', 'pass1234', 'estudiante7@example.com', 'comercio_exterior', 'Cartago', 'Septimo'),
('2262008', 'Carlos', 'Hernández', 'password123', 'estudiante8@example.com', 'tecnologia_alimentos', 'Tulua', 'Octavo'),
('2262009', 'Ana', 'Martínez', 'securepass', 'estudiante9@example.com', 'tecnologia_desarrollo_software', 'Norte del Cauca', 'Noveno'),
('2262010', 'Luis', 'Pérez', '123456', 'estudiante10@example.com', 'ingieneria_sistemas', 'Yumbo', 'Decimo'),
('2262011', 'Andrea', 'Gómez', 'qwerty', 'estudiante11@example.com', 'ingieneria_informatica', 'Cali', 'Primero'),
('2262012', 'Jorge', 'Díaz', 'pass123', 'estudiante12@example.com', 'ingieneria_industrial', 'Pacifico', 'Segundo'),
('2262013', 'Marta', 'López', 'password123', 'estudiante13@example.com', 'ingieneria_electronica', 'Palmira', 'Tercero'),
('2262014', 'David', 'Martínez', 'securepass', 'estudiante14@example.com', 'administracion_empresas', 'Zarzal', 'Cuarto'),
('2262015', 'Elena', 'Gómez', '123456', 'estudiante15@example.com', 'tecnologia_alimentos', 'Caicedonia', 'Quinto'),
('2262016', 'Daniel', 'García', 'qwerty', 'estudiante16@example.com', 'tecnologia_desarrollo_software', 'Buga', 'Sexto'),
('2262017', 'Sara', 'Hernández', 'student123', 'estudiante17@example.com', 'ingieneria_sistemas', 'Cartago', 'Septimo'),
('2262018', 'Pablo', 'Martínez', 'pass1234', 'estudiante18@example.com', 'ingieneria_informatica', 'Tulua', 'Octavo'),
('2262019', 'Ana', 'Pérez', 'password123', 'estudiante19@example.com', 'ingieneria_industrial', 'Norte del Cauca', 'Noveno'),
('2262020', 'Lucas', 'Sánchez', 'securepass', 'estudiante20@example.com', 'ingieneria_electronica', 'Yumbo', 'Decimo'),
('2262021', 'Carla', 'López', '123456', 'estudiante21@example.com', 'administracion_empresas', 'Cali', 'Primero'),
('2262022', 'Mario', 'Gómez', 'qwerty', 'estudiante22@example.com', 'comercio_exterior', 'Pacifico', 'Segundo'),
('2262023', 'Paula', 'Martínez', 'pass123', 'estudiante23@example.com', 'tecnologia_alimentos', 'Palmira', 'Tercero'),
('2262024', 'Mateo', 'García', 'student123', 'estudiante24@example.com', 'tecnologia_desarrollo_software', 'Zarzal', 'Cuarto'),
('2262025', 'Sofía', 'Hernández', 'password123', 'estudiante25@example.com', 'ingieneria_sistemas', 'Caicedonia', 'Quinto'),
('2262026', 'Javier', 'López', 'securepass', 'estudiante26@example.com', 'ingieneria_informatica', 'Buga', 'Sexto'),
('2262027', 'Valentina', 'Pérez', '123456', 'estudiante27@example.com', 'ingieneria_industrial', 'Cartago', 'Septimo'),
('2262028', 'Diego', 'Martínez', 'qwerty', 'estudiante28@example.com', 'ingieneria_electronica', 'Tulua', 'Octavo'),
('2262029', 'Camila', 'Gómez', 'pass123', 'estudiante29@example.com', 'administracion_empresas', 'Norte del Cauca', 'Noveno'),
('2262030', 'Juan', 'Sánchez', '123456', 'estudiante30@example.com', 'tecnologia_alimentos', 'Yumbo', 'Decimo'),
('2262031', 'Ana', 'Rodríguez', 'securepass', 'estudiante31@example.com', 'tecnologia_desarrollo_software', 'Cali', 'Primero'),
('2262032', 'Lucas', 'Martínez', 'password123', 'estudiante32@example.com', 'ingieneria_sistemas', 'Pacifico', 'Segundo');


CREATE TABLE monitor (
    codigo_monitor VARCHAR(13) NOT NULL UNIQUE PRIMARY KEY,
    cedula_monitor VARCHAR(13) NOT NULL,
    email_monitor VARCHAR(50) NOT NULL UNIQUE,
    nombre_monitor VARCHAR(50) NOT NULL,
    apellido_monitor VARCHAR(50) NOT NULL,
    semestre_monitor VARCHAR(50) NOT NULL,
    sede_monitor VARCHAR(50) NOT NULL,
    carrera_monitor VARCHAR(50) NOT NULL,
    numero_monitor VARCHAR(50) NOT NULL,
    password_monitor VARCHAR(50) NOT NULL, 
    estado_monitor VARCHAR(50) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB;

INSERT INTO monitor (codigo_monitor, cedula_monitor, email_monitor, nombre_monitor, apellido_monitor, semestre_monitor, sede_monitor, carrera_monitor, numero_monitor, password_monitor)
VALUES
('2262567', '1234567890', 'monitor1@example.com', 'Juan', 'Pérez', '6', 'Sede Central', 'Ingeniería Informática', '123456789', 'password123'),
('2262568', '0987654321', 'monitor2@example.com', 'María', 'González', '5', 'Sede Norte', 'Ciencias de la Computación', '987654321', 'securepass'),
('2262569', '1111111111', 'monitor3@example.com', 'Luis', 'Martínez', '7', 'Sede Sur', 'Ingeniería de Software', '111111111', '123456'),
('2262570', '2222222222', 'monitor4@example.com', 'Ana', 'Sánchez', '4', 'Sede Este', 'Tecnologías de la Información', '222222222', 'pass123'),
('2262571', '3333333333', 'monitor5@example.com', 'Carlos', 'López', '8', 'Sede Oeste', 'Seguridad Informática', '333333333', 'qwerty');

CREATE TABLE administrador (
    cedula_administrador VARCHAR(15) NOT NULL,
    nombre_administrador VARCHAR(50) NOT NULL,
    email_administrador VARCHAR(50) NOT NULL,
    apellido_administrador VARCHAR(50) NOT NULL,
    sede_administrador VARCHAR(50) NOT NULL,
    password_administrador VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

INSERT INTO administrador (cedula_administrador, nombre_administrador, email_administrador, apellido_administrador, sede_administrador, password_administrador) 
VALUES
('1000000000', 'Juan', 'juan.perez@example.com', 'Pérez', 'Sede Central', 'abc123'),
('1000000001', 'María', 'maria.garcia@example.com', 'García', 'Sede Norte', 'xyz789'),
('1000000002', 'Carlos', 'carlos.rodriguez@example.com', 'Rodríguez', 'Sede Sur', 'pass12'),
('1000000003', 'Ana', 'ana.lopez@example.com', 'López', 'Sede Este', '123456'),
('1000000004', 'Luis', 'luis.martinez@example.com', 'Martínez', 'Sede Oeste', 'qwerty');