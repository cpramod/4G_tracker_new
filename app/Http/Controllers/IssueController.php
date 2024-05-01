<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Issue;
use Illuminate\Http\Request;

class IssueController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'attachments' => 'required',
        ]);
        $file_path = '';
        if ($request->hasFile('attachments')) {
            $files = $request->file('attachments');
            foreach ($files as $file) {
                $name = now()->timestamp . "_{$file->getClientOriginalName()}";
                $path = $file->storeAs('album_images', $name, 'public');
                $file_path = "/storage/{$path}";
            }
        }
        $issue = Issue::create([
            'title' => $request->title,
            'description' => $request->description,
            'attachments' => $file_path,
            'site_id' => $request->site_id,
            'user_id' => $request->user()->id,
            'status' => $request->status,
        ]);
        if ($issue) {
            return to_route('wireless.sites.show', $request->site_id);
        }
    }

    public function comment_store(Request $request)
    {
        $request->validate([
            'comment_content' => 'required',
        ]);

        $comment = Comment::create([
            'comment_content' => $request->comment_content,
            'issue_id' => $request->issue_id,
            'user_id' => $request->user()->id,
        ]);
    }
}
