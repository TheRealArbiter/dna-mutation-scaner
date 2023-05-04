export const HTTP_CODIGOS = {
    _200:{
        'estatus':200,
        'contexto':{
            _000:{
                'codigo':'000',
                'mensaje':'Operación exitosa'
            },
            _001:{
                'codigo':'001',
                'mensaje':'No se encontraron registros en la consulta'
            }
        }
    },
    _400:{
        'estatus':400,
        'contexto':{
            _000:{
                'codigo':'000',
                'mensaje':'Cabeceras inválidas'
            },
            _010:{
                'codigo':'010',
                'mensaje':'Esquema inválido'
            }
        }
    },
    _403:{
        'estatus':403,
        'contexto':{
            _000:{
                'codigo':'000',
                'mensaje':'No mutations'
            }
        }
    },
    _500:{
        'estatus':500,
        'contexto':{
            _100:{
                'codigo':'100',
                'mensaje':'Error en consulta a base de datos'
            },
            _101:{
                'codigo':'101',
                'mensaje':'Error al ejecutar proceso'
            }
        }
    }
}
