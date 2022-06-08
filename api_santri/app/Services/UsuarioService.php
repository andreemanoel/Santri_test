<?php

namespace App\Services;

use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioService {

  protected $user;

  public function __construct(Usuario $user) {
    $this->user = $user;
  }

  public function get() {
    $data = $this->user->get();
    return response()->json($data);
  }
  
  public function store(Request $request) {
    $this->user->create($request->all());
  }
}