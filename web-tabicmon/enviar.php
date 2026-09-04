<?php
/**
 * Tabic-Mon — receptor del formulario de presupuesto.
 *
 * Pensado para hosting compartido con PHP (Hostinger, Raiola, Webempresa…).
 * Sin librerías ni dependencias: se sube junto al index.html y funciona.
 *
 * ANTES DE SUBIRLO, revisa las dos constantes de abajo. REMITENTE debe ser una
 * cuenta de correo que exista de verdad en el dominio: si envías con una
 * dirección ajena al dominio, SPF y DMARC hacen que el correo acabe en spam.
 */

declare(strict_types=1);

const DESTINATARIO = 'info@tabicmon.com';
const REMITENTE    = 'web@tabicmon.com';   // crear esta cuenta en el panel de hosting
const ASUNTO_BASE  = 'Solicitud de presupuesto';

/* ------------------------------------------------------------------ */

$esAjax = isset($_SERVER['HTTP_ACCEPT']) && str_contains($_SERVER['HTTP_ACCEPT'], 'application/json');

function responder(bool $ok, string $mensaje, int $codigo = 200): never
{
    global $esAjax;
    http_response_code($codigo);

    if ($esAjax) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'mensaje' => $mensaje], JSON_UNESCAPED_UNICODE);
    } else {
        // Sin JavaScript no hay mensaje en línea: se devuelve una página de aviso.
        header('Content-Type: text/html; charset=utf-8');
        $titulo = $ok ? 'Solicitud enviada' : 'No se ha podido enviar';
        echo '<!doctype html><html lang="es"><head><meta charset="utf-8">'
           . '<meta name="viewport" content="width=device-width,initial-scale=1">'
           . '<title>' . $titulo . ' — Tabic-Mon</title><style>'
           . 'body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fff;color:#494B51;'
           . 'font:16px/1.6 "IBM Plex Sans",Helvetica,Arial,sans-serif;padding:2rem;text-align:center}'
           . 'h1{color:#101218;font-size:1.6rem;margin:0 0 .6rem}'
           . 'i{display:block;width:54px;height:54px;margin:0 auto 1.2rem;border:3px solid #59C601}'
           . 'a{display:inline-block;margin-top:1.6rem;background:#59C601;color:#fff;'
           . 'padding:.8rem 1.4rem;text-decoration:none;font-weight:600}</style></head><body><main>'
           . '<i></i><h1>' . $titulo . '</h1><p>' . htmlspecialchars($mensaje, ENT_QUOTES) . '</p>'
           . '<a href="index.html">Volver a la web</a></main></body></html>';
    }
    exit;
}

/** Una cabecera de correo no puede contener saltos de línea: son la vía de inyección. */
function limpiarCabecera(string $valor): string
{
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], '', $valor));
}

function campo(string $nombre, int $max = 400): string
{
    $valor = (string) ($_POST[$nombre] ?? '');
    $valor = trim(strip_tags($valor));
    return mb_substr($valor, 0, $max);
}

/* --- 1. Solo POST --- */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    responder(false, 'Método no permitido.', 405);
}

/* --- 2. Trampa antispam: es un campo oculto que una persona nunca rellena --- */
if (campo('empresa_web') !== '') {
    responder(true, 'Gracias, hemos recibido tu solicitud.');   // al bot se le responde que sí
}

/* --- 3. Datos --- */
$nombre  = campo('nombre', 120);
$tel     = campo('tel', 40);
$email   = campo('email', 160);
$sistema = campo('sistema', 80);
$m2      = campo('m2', 80);
$plazo   = campo('plazo', 80);
$detalle = campo('detalle', 4000);
$consent = isset($_POST['consentimiento']);

/* --- 4. Validación --- */
$errores = [];
if (mb_strlen($nombre) < 2)                             $errores[] = 'nombre';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))         $errores[] = 'email';
if (preg_replace('/\D/', '', $tel) === '')              $errores[] = 'teléfono';
if (!$consent)                                          $errores[] = 'consentimiento';

if ($errores) {
    responder(false, 'Revisa estos campos: ' . implode(', ', $errores) . '.', 422);
}

/* --- 5. Mensaje --- */
$cuerpo = implode("\n", [
    'Nueva solicitud desde la web',
    str_repeat('-', 32),
    'Nombre:      ' . $nombre,
    'Teléfono:    ' . $tel,
    'Email:       ' . $email,
    'Servicio:    ' . $sistema,
    'Superficie:  ' . ($m2 ?: '—'),
    'Plazo:       ' . ($plazo ?: '—'),
    '',
    'La obra:',
    $detalle ?: '—',
    '',
    str_repeat('-', 32),
    'Fecha: ' . date('d/m/Y H:i'),
    'IP:    ' . ($_SERVER['REMOTE_ADDR'] ?? '—'),
]);

$cabeceras = implode("\r\n", [
    'From: Web Tabic-Mon <' . REMITENTE . '>',
    'Reply-To: ' . limpiarCabecera($nombre) . ' <' . limpiarCabecera($email) . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
]);

$asunto = ASUNTO_BASE . ' — ' . ($sistema ?: 'consulta') . ' — ' . $nombre;

/* El quinto parámetro fija el sobre del envío; sin él muchos servidores lo rechazan. */
$enviado = mail(
    DESTINATARIO,
    '=?UTF-8?B?' . base64_encode($asunto) . '?=',
    $cuerpo,
    $cabeceras,
    '-f' . REMITENTE
);

responder(
    $enviado,
    $enviado
        ? 'Gracias. Te llamamos en menos de 24 horas laborables.'
        : 'No hemos podido enviar el mensaje. Llámanos al 93 142 70 80.',
    $enviado ? 200 : 500
);
