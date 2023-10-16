# GPTletAPI UI

## Overview

GPTletAPI UI is a Next.js-based frontend for the GPTletAPI backend service. It allows users to interact with small conversational apps powered by GPT.

## Requirements

- Node.js 19+
- Yarn or npm

## Setup

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```bash
   cd gptletapi_ui
   ```

3. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

4. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

## Usage

Once the server is running, navigate to `http://localhost:3000` to start using the application.

## Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```
