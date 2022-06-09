<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UsuarioService;

class UsuarioController extends Controller
{

    protected $user_service;

    public function __construct(UsuarioService $user_service) {
        $this->user_service = $user_service;
    }
    
    public function register(Request $request)
    {
        if($request->USUARIO_ID){
            return $this->user_service->update($request, $request->USUARIO_ID);
        }
        return $this->user_service->register($request);
    }

    public function getAll()
    {
        return $this->user_service->getAll();
    }

    public function delete(Request $request)
    {
        return $this->user_service->delete($request->id);
    }

    public function user(Request $request)
    {
        return $this->user_service->user($request->id);
    }

    public function busca(Request $request)
    {
        return $this->user_service->busca($request->filter);
    }
}
