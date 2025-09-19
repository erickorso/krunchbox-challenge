import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Image 
              src="/Krunchbox-logo.svg" 
              alt="Krunchbox Logo" 
              width={32}
              height={32}
              className="mr-3"
            />
            <CardTitle className="text-6xl">404</CardTitle>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Página no encontrada
          </h1>
          <p className="text-gray-600 mb-2">
            La página que buscas no existe o ha sido movida.
          </p>
          <p className="text-sm text-gray-500">
            Powered by Krunchbox 2.0
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild className="w-full">
            <Link href="/">
              Volver al Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
