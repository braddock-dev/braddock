"use client";

interface BookingPagePreviewProps {
  pageTitle: string;
  coverImage: string;
  backgroundImage: string;
  backgroundColor: string;
  services: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

export default function BookingPagePreview({ pageTitle, coverImage, backgroundImage, backgroundColor, services }: BookingPagePreviewProps) {
  return (
    <div className="lg:flex-1 lg:p-6 p-4 bg-slate-50 overflow-y-auto" style={{ backgroundColor }}>
      <div className="text-lg font-semibold text-black mb-6 text-center">Pré-visualização</div>
      <div className="rounded-xl overflow-hidden shadow-lg max-w-sm mx-auto bg-white">
        {/* Header Image */}
        <div className="relative h-48 overflow-hidden">
          <img src={coverImage || "/src/app/ui/images/hero-image.jpg"} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-lg">{pageTitle}</div>
        </div>

        {/* Booking Card */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-black mb-2">Nova Marcação</h3>
          <p className="text-sm text-gray-500 mb-6">Escolha um serviço</p>

          <div>
            {services.map((service) => (
              <div key={service.id} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
                <span className="text-base text-black font-medium">{service.name}</span>
                <span className="text-base text-amber-800 font-semibold">€{service.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <a href="#" className="text-gray-500 text-xs hover:underline">
              Ver política de cookies
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
