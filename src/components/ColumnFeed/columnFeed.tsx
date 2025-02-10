import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_COLUMN_FEED } from "./mockData";

export function ColumnFeed() {
  const { welcome, featuredStudies, activeForums, academicEvents } = MOCK_COLUMN_FEED;

  return (
    <div className="space-y-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{welcome.title}</CardTitle>
          <CardDescription>{welcome.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Compartilhe conhecimento, participe de debates construtivos e colabore em projetos acadêmicos.</p>
          <Button className="w-full">{welcome.buttonText}</Button>
        </CardContent>
      </Card>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{featuredStudies.title}</CardTitle>
          <CardDescription>{featuredStudies.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featuredStudies.studies.map((study, index) => (
              <div key={index}>
                <p className="font-medium">{study.title}</p>
                <p className="text-sm text-gray-500">
                  {study.institution && `Por ${study.institution}`}
                  {study.citations && ` - ${study.citations} citações`}
                  {study.contributors && ` - ${study.contributors} contribuidores`}
                  {study.reviews && ` - ${study.reviews} revisões`}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{activeForums.title}</CardTitle>
          <CardDescription>{activeForums.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeForums.forums.map((forum, index) => (
              <div key={index}>
                <p className="font-medium">{forum.title}</p>
                <p className="text-sm text-gray-500">
                  {forum.participants && `${forum.participants} especialistas participando`}
                  {forum.recentContributions && `${forum.recentContributions} contribuições recentes`}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{academicEvents.title}</CardTitle>
          <CardDescription>{academicEvents.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {academicEvents.events.map((event, index) => (
              <div key={index}>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-500">
                  {event.startDate && `Início em ${event.startDate}`}
                  {event.registrations && ` - ${event.registrations} inscritos`}
                  {event.format && ` - ${event.format}`}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}