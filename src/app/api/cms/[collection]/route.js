import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { commitToGitHub } from '@/lib/github';

const dataDir = path.join(process.cwd(), 'src', 'data');

const isAuthenticated = (request) => {
  const token = request.cookies.get('admin_token')?.value;
  return token === 'authenticated_aimy_admin';
};

export async function GET(request, { params }) {
  const { collection } = await params;
  
  try {
    const filePath = path.join(dataDir, `${collection}.json`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { collection } = await params;
  
  try {
    const newData = await request.json();
    const filePath = path.join(dataDir, `${collection}.json`);
    const jsonString = JSON.stringify(newData, null, 2);
    
    await fs.writeFile(filePath, jsonString, 'utf8');
    
    await commitToGitHub(`src/data/${collection}.json`, jsonString, `CMS Update: Modified ${collection}.json`, false);
    
    return NextResponse.json({ success: true, message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
