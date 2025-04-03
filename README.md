# laravel-vanilla

# 構築手順

## 1    
.gitkeepを削除後、BACKENDディレクトリ内で「composer create-project laravel/laravel:10.* .」を実行してlaravelプロジェクトを作成。
## 2
プロジェクトディレクトリに戻って、「cp ./tmp/Dockerfile ./backend/Dockerfile」を実行し、バックエンドのDockerfileをコピー。
## 3
プロジェクトディレクトリ内で「docker-compose up -d --build」を実行し、フロントエンドとバックエンドを構築。
## 4
バックエンドのlaravel内の「routes/api.php」で以下のように記述。
### php

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;

    Route::get('/hello', function () {
        return response()->json(['message' => 'Hello from Laravel']);
    });

## 5
バックエンドのlaravel内の「config/cors.php」で以下のように記述。
### php

    'paths' => ['api/*'],

    'allowed_origins' => ['http://localhost:3000'],

    'allowed_methods' => ['*'],

    'allowed_headers' => ['*'],

    'supports_credentials' => true,# line
