<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use Session;
use Carbon\Carbon;

class AuthController extends Controller
{
    private $user;

    public function __construct(Usuario $user) 
    {
        $this->user = $user;
    }

    public function login(Request $request)
    {
        $user = Usuario::where('LOGIN', $request->LOGIN)->with('autorizacoes')->first();

        if (!$user || ($user->SENHA !== $request->SENHA)){
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        // Session::put('authenticated', $user);
        $token = bin2hex(random_bytes(64));

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }
}
