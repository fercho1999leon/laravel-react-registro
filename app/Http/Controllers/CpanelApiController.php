<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class CpanelApiController extends Controller
{
    public function create(Request $request){
        if(!($request->user === ' ' && $request->pass === ' ')){
            $response = $this->add($request->user,$request->pass);
            echo(json_encode($response->json()));
        }else{
            echo json_encode('{"status":0,"messages":[""],"warnings":null,"metadata":{},"errors":null,"data":""}');
        }
    }
    private function add($user,$pass){
        $username = env('EMAIL_CPANEL_USER');
        $token = env('EMAIL_CPANEL_TOKEN');
        $domain = env('EMAIL_CPANEL_DOMAIN');
        $quotaEmail = "1024";
        $url = 'https://'.$domain.':2083/execute/Email/add_pop';
        $url .= '?email='.$user.'@itred.edu.ec&password='.$pass.'&quota='.$quotaEmail;
        return Http::withToken($username . ':' . $token, 'cpanel')->get($url);
    }
}
