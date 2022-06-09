<?php

namespace App\Services;

use App\Models\Usuario;
use App\Models\Autorizacao;
use Illuminate\Http\Request;
use App\Http\Resources\UsuarioResource;

class UsuarioService {

  protected $user;

  public function __construct(Usuario $user, Autorizacao $autorizacao) {
    $this->user = $user;
    $this->autorizacao = $autorizacao;
  }
  
  public function register($request) {
    $user = Usuario::where('LOGIN', $request->LOGIN)->first();
    if ($user){
      return response()->json([
          'message' => 'Login ja registrado. Tente outro.'
      ], 422);
    }
    $user = $this->user->create($request->all());

    if($user){
      foreach($request->autorizacoes as $val){
        $this->autorizacao->create(['CHAVE_AUTORIZACAO'=> $val, 'USUARIO_ID' => $user->id]);
      }
    }

    return response()->json([
        'message' => 'Usuario criado com sucesso!'
    ], 201);
  }

  public function update($request, $id) {
    $user = $this->user->where('USUARIO_ID', $id)->update([
      'NOME_COMPLETO' => $request->NOME_COMPLETO,
      'ATIVO' => $request->ATIVO,
      'LOGIN' => $request->LOGIN,
      'SENHA' => $request->SENHA,
    ]);

    $this->autorizacao->where('USUARIO_ID', $id)->delete();

    foreach($request->autorizacoes as $val){
      $this->autorizacao->create(['CHAVE_AUTORIZACAO'=> $val, 'USUARIO_ID' => $id]);
    }

    return response()->json([
        'message' => 'Usuario atualizado com sucesso!'
    ], 201);
  }

  public function getAll() {
    $usuarios = $this->user->with('autorizacoes')->get();
    return response()->json(UsuarioResource::collection($usuarios));
  }

  public function delete($id) {
    $data = $this->user->where('USUARIO_ID', $id)->delete();

    if($data){
        return response()->json([
            'message' => 'Usuario excluido com sucesso!'
        ], 200);
    }

    return response()->json([
        'message' => 'user does not exist'
    ], 404);
  }

  public function user($id){
    $usuario = $this->user->where('USUARIO_ID',$id)->with('autorizacoes')->get();
    return $usuario;
  }

  public function busca($filter){
    $usuarios = $this->user->where('NOME_COMPLETO','LIKE','%'.$filter."%")->get();
    return response()->json(UsuarioResource::collection($usuarios));
  }
}