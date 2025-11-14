from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import random, string

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///admin.db'
db = SQLAlchemy(app)

# MODELOS
class Empleado(db.Model):
    empleado_id = db.Column(db.String(20), primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    correo = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    cargo = db.Column(db.String(100), nullable=False)
    departamento = db.Column(db.String(100), nullable=False)
    fecha_ingreso = db.Column(db.String(20), nullable=False)
    estado = db.Column(db.String(20), nullable=False)

class Turno(db.Model):
   id_turno = db.Column(db.Integer, primary_key=True)
   codigo_turno = db.Column(db.String(10), unique=True, nullable=False)
   empleado_id = db.Column(db.String(20), db.ForeignKey('empleado.empleado_id'))
   fecha = db.Column(db.String(20), nullable=False)
   hora_inicio = db.Column(db.String(10), nullable=False)
   hora_fin = db.Column(db.String(10), nullable=False)

   empleado = db.relationship('Empleado', backref='turnos')


class Pago(db.Model):
    id_pago = db.Column(db.String(4), primary_key=True)
    empleado_id = db.Column(db.String(20), db.ForeignKey('empleado.empleado_id'))
    monto = db.Column(db.String(20), nullable=False)
    justificante = db.Column(db.Text)
    fecha = db.Column(db.String(20), nullable=False)
    metodo = db.Column(db.String(50), nullable=False)
    estado = db.Column(db.String(20), nullable=False)

    @staticmethod
    def generar_id():
        while True:
            nuevo_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
            if not Pago.query.filter_by(id_pago=nuevo_id).first():
                return nuevo_id

class Recibo(db.Model):
    id_recibo = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(100), nullable=False)
    monto = db.Column(db.String(20), nullable=False)
    fecha = db.Column(db.String(20), nullable=False)
    estado = db.Column(db.String(20), nullable=False)
    descargas = db.Column(db.Integer, default=0)
    enviados = db.Column(db.Integer, default=0)

class Reporte(db.Model):
    id_reporte = db.Column(db.Integer, primary_key=True)
    nombre_archivo = db.Column(db.String(200), nullable=False)
    fecha = db.Column(db.String(20), nullable=False)
    peso = db.Column(db.String(20), nullable=False)
    archivo = db.Column(db.String(200))

# RUTAS EMPLEADOS
@app.route('/api/empleados', methods=['GET'])
def get_empleados():
    empleados = Empleado.query.all()
    return jsonify([{
        'id': e.empleado_id,
        'nombre': e.nombre,
        'cargo': e.cargo,
        'departamento': e.departamento,
        'fecha_ingreso': e.fecha_ingreso,
        'estado': e.estado
    } for e in empleados])

@app.route('/api/empleados', methods=['POST'])
def crear_empleado():
    try:
        data = request.json
        nuevo = Empleado(**data)
        db.session.add(nuevo)
        db.session.commit()
        return jsonify({
            'empleado_id': nuevo.empleado_id,
            'nombre': nuevo.nombre,
            'cargo': nuevo.cargo,
            'departamento': nuevo.departamento,
            'fecha_ingreso': nuevo.fecha_ingreso,
            'estado': nuevo.estado
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/empleados/<string:id>', methods=['GET'])
def obtener_empleado(id):
    empleado = Empleado.query.get_or_404(id)
    return jsonify({
        'id': empleado.empleado_id,
        'nombre': empleado.nombre,
        'correo': empleado.correo,
        'telefono': empleado.telefono,
        'cargo': empleado.cargo,
        'departamento': empleado.departamento,
        'fecha_ingreso': empleado.fecha_ingreso,
        'estado': empleado.estado
    })

@app.route('/api/empleados/<string:id>', methods=['PUT'])
def editar_empleado(id):
    empleado = Empleado.query.get_or_404(id)
    data = request.json
    for campo in data:
        setattr(empleado, campo, data[campo])
    db.session.commit()
    return jsonify({'mensaje': 'Empleado actualizado'})

# RUTAS TURNOS
@app.route('/api/turnos', methods=['POST'])
def asignar_turno():
    data = request.json
    data['codigo_turno'] = generar_codigo_turno() 
    nuevo = Turno(**data)
    db.session.add(nuevo)
    db.session.commit()
    return jsonify({'id_turno': nuevo.id_turno}), 201

@app.route('/api/turnos', methods=['GET'])
def get_turnos():
    turnos = Turno.query.all()
    return jsonify([{
        'id_turno': t.id_turno,
        'codigo_turno': t.codigo_turno,
        'empleado_id': t.empleado_id,
        'nombre': t.empleado.nombre if t.empleado else "",
        'fecha': t.fecha,
        'hora_inicio': t.hora_inicio,
        'hora_fin': t.hora_fin
    } for t in turnos])

@app.route('/api/resumen/turnos/hoy', methods=['GET'])
def turnos_hoy():
    hoy = datetime.now().strftime("%Y-%m-%d")
    total = Turno.query.filter_by(fecha=hoy).count()
    return jsonify({'turnos_hoy': total})

@app.route('/api/resumen/turnos/programados', methods=['GET'])
def turnos_programados():
    hoy = datetime.now().strftime("%Y-%m-%d")
    total = Turno.query.filter(Turno.fecha >= hoy).count()
    return jsonify({'turnos_programados': total})

def generar_codigo_turno(longitud=6):
    caracteres = string.ascii_uppercase + string.digits
    while True:
        codigo = ''.join(random.choices(caracteres, k=longitud))
        if not Turno.query.filter_by(codigo_turno=codigo).first():
            return codigo

# RUTAS PAGOS
@app.route('/api/pagos', methods=['POST'])
def registrar_pago():
    try:
        data = request.json
        nuevo = Pago(**data)
        nuevo.id_pago = Pago.generar_id()
        db.session.add(nuevo)
        db.session.commit()
        return jsonify({'id_pago': nuevo.id_pago}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/pagos', methods=['GET'])
def get_pagos():
    pagos = Pago.query.all()
    return jsonify([{
        'id_pago': p.id_pago,
        'empleado_id': p.empleado_id,
        'monto': p.monto,
        'justificante': p.justificante,
        'fecha': p.fecha,
        'metodo': p.metodo,
        'estado': p.estado
    } for p in pagos])

@app.route("/api/resumen/pagos", methods=["GET"])
def resumen_pagos():
    pagos = Pago.query.all()
    total = 0
    completados = 0
    pendientes = 0

    for p in pagos:
        try:
            monto = str(p.monto).strip()
            if monto:
                total += float(monto)
        except (ValueError, TypeError):
            continue

        estado = p.estado.lower().strip()
        if estado == "completado":
            completados += 1
        elif estado == "pendiente":
            pendientes += 1

    return jsonify({
        "total_pagado": total,
        "completados": completados,
        "pendientes": pendientes
    })

# RUTAS RECIBOS
@app.route('/api/recibos', methods=['POST'])
def crear_recibo():
    try:
        data = request.json
        nuevo = Recibo(**data)
        db.session.add(nuevo)
        db.session.commit()
        return jsonify({'id_recibo': nuevo.id_recibo}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/recibos', methods=['GET'])
def get_recibos():
    try:
        recibos = Recibo.query.all()
        return jsonify([{
            'id_recibo': r.id_recibo,
            'cliente': r.cliente,
            'monto': r.monto,
            'fecha': r.fecha,
            'estado': r.estado,
            'descargas': r.descargas,
            'enviados': r.enviados
        } for r in recibos])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# RUTAS REPORTES
@app.route('/api/reportes', methods=['POST'])
def crear_reporte():
    try:
        data = request.json
        nuevo = Reporte(**data)
        db.session.add(nuevo)
        db.session.commit()
        return jsonify({'id_reporte': nuevo.id_reporte}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/reportes', methods=['GET'])
def get_reportes():
    fecha = request.args.get('fecha')
    query = Reporte.query
    if fecha:
        query = query.filter_by(fecha=fecha)
    reportes = query.all()
    return jsonify([{
        'id_reporte': r.id_reporte,
        'nombre_archivo': r.nombre_archivo,
        'fecha': r.fecha,
        'peso': r.peso,
        'archivo': r.archivo
    } for r in reportes])

#  INICIALIZAR
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("Base de datos lista con todas las tablas")
    app.run(debug=True)
