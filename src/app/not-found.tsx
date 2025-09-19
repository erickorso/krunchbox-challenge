import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-6xl mb-4">404</CardTitle>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Página no encontrada
          </h1>
          <p className="text-gray-600 mb-2">
            La página que buscas no existe o ha sido movida.
          </p>
          <p className="text-sm text-gray-500">
            Verifica la URL o regresa al dashboard
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
