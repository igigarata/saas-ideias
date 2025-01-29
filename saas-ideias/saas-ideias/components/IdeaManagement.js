import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageCircle } from "lucide-react";

const ideasMock = [
  { id: 1, title: "Automatização de Processos", description: "Sugestão para automatizar tarefas repetitivas usando RPA.", votes: 12, comments: 3 },
  { id: 2, title: "Novo Benefício para Funcionários", description: "Proposta de plano de saúde mais acessível.", votes: 8, comments: 1 },
];

export default function IdeaManagement() {
  const [ideas, setIdeas] = useState(ideasMock);
  const [newIdea, setNewIdea] = useState({ title: "", description: "" });

  const handleVote = (id) => {
    setIdeas(
      ideas.map((idea) =>
        idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
      )
    );
  };

  const handleSubmit = () => {
    if (newIdea.title && newIdea.description) {
      setIdeas([
        ...ideas,
        { id: ideas.length + 1, ...newIdea, votes: 0, comments: 0 },
      ]);
      setNewIdea({ title: "", description: "" });
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Ideias</h1>
      <Card className="mb-6 p-4">
        <h2 className="text-lg font-semibold mb-2">Envie uma Nova Ideia</h2>
        <Input
          placeholder="Título da Ideia"
          value={newIdea.title}
          onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
          className="mb-2"
        />
        <Textarea
          placeholder="Descrição da Ideia"
          value={newIdea.description}
          onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
          className="mb-2"
        />
        <Button onClick={handleSubmit}>Enviar Ideia</Button>
      </Card>
      
      {ideas.map((idea) => (
        <Card key={idea.id} className="mb-4 p-4">
          <CardContent>
            <h3 className="text-lg font-semibold">{idea.title}</h3>
            <p className="text-gray-600">{idea.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <Button variant="ghost" onClick={() => handleVote(idea.id)}>
                <ThumbsUp className="w-5 h-5" /> {idea.votes}
              </Button>
              <Button variant="ghost">
                <MessageCircle className="w-5 h-5" /> {idea.comments}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
