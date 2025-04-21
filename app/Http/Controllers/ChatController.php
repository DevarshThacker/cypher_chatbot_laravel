<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Gemini\Laravel\Facades\Gemini;

    use Illuminate\Support\Facades\Http;
// use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Display the chat page.
     */
    public function index()
    {
        return Inertia::render('chat');
    }

    /**
     * Handle chatbot API requests.
     */
    // public function getResponse(Request $request)
    // {
    //     $userMessage = $request->input('message');

    //     // Call the Gemini API to generate a response
    //     // $result = Gemini::geminiPro()->generateContent('hello');
    //     $result = Gemini::model('models/gemini-1.0-pro')->generateContent('hello');

    //     dd($result);

    //     // Return the response text
    //     return response()->json([
    //         'response' => $result->text(),
    //     ]);
    // }


    public function getResponse(Request $request)
    {
        $userMessage = $request->input('message');

        $apiKey = env('GEMINI_API_KEY'); // Set this in your .env file

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$apiKey", [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $userMessage]
                    ]
                ]
            ]
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to connect to Gemini API.'], 500);
        }

        // Extract the content from the response
        $data = $response->json();
        $generatedText = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'No response generated.';

        return response()->json([
            'response' => $generatedText,
        ]);
    }



    // /**
    //  * Show the form for creating a new resource.
    //  */
    // public function create()
    // {
    //     //
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    // public function store(Request $request)
    // {
    //     //
    // }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(string $id)
    // {
    //     //
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(string $id)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, string $id)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(string $id)
    // {
    //     //
    // }
}
