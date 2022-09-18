import { Input } from "./forms/Input";
import { FormEvent, useEffect, useState } from "react";

import { Check, GameController, CaretDown } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";

interface Games {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Games[]>([]);

  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5500/games").then((response) => setGames(response.data));
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      await axios.post(`http://localhost:5500/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        weekDays: weekDays.map(Number),
        useVoiceChannel: useVoiceChannel,
      });
      alert("Anúncio criado com sucesso");
    } catch (err) {
      alert("Erro ao criar, tente novamente!");
    }
  }
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
        <Dialog.Title className="text-3xl font-bold">Publique um anúncio</Dialog.Title>

        <form
          className="mt-8"
          onSubmit={handleCreateAd}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="game"
              className="font-semibold">
              Qual o game?
            </label>
            <Select.Root
              name="game"
              defaultValue="whatever">
              <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 flex items-center justify-between">
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon asChild />
                <CaretDown className="w-4 h-4 text-zinc-400" />
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="w-full bg-zinc-800 p-2 rounded text-white top-12 absolute overflow-auto">
                  <Select.Viewport>
                    {games.map((game) => {
                      return (
                        <Select.Item
                          key={game.id}
                          value={game.id}
                          className="p-2 cursor-pointer outline-none w-full hover:bg-zinc-900">
                          <Select.ItemText>{game.title}</Select.ItemText>
                          <Select.ItemIndicator className="text-emerald-600">
                            {" "}
                            {"\u2022"}
                          </Select.ItemIndicator>
                        </Select.Item>
                      );
                    })}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>

            <label htmlFor="name">Seu nome (ou Nickname)</label>
            <Input
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                <Input
                  id="yearsPlaying"
                  name="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu Discord?</label>
                <Input
                  id="discord"
                  name="discord"
                  placeholder="Usuario#0000"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-3">
                <label htmlFor="weekDays">Quando costuma jogar?</label>
                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  value={weekDays}
                  onValueChange={setWeekDays}>
                  <ToggleGroup.Item
                    value={"0"}
                    title="Domingo"
                    className={`w-8 h-8 rounded bg-zinc-900 ${
                      weekDays.includes("0") ? "bg-violet-500" : ""
                    }`}>
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value={"1"}
                    title="Segunda"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900 "
                    }`}>
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value={"2"}
                    title="Terça"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900 "
                    }`}>
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value={"3"}
                    title="Quarta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900 "
                    }`}>
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value={"4"}
                    title="Quinta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900 "
                    }`}>
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value={"5"}
                    title="Sexta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900 "
                    }`}>
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value={"6"}
                    title="Sabádo"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900 "
                    }`}>
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className="grid grid-col gap-2">
                  <Input
                    type="time"
                    name="hourStart"
                    id="hourStart"
                    placeholder="De"
                  />
                  <Input
                    type="time"
                    name="hourEnd"
                    id="hourEnd"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex gap-2 text-sm items-center cursor-pointer">
              <Checkbox.Root
                className="w-6 h-6 p-1 rounded bg-zinc-900"
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setUseVoiceChannel(true);
                  } else {
                    setUseVoiceChannel(false);
                  }
                }}>
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>
          </div>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 rounded-md px-5 h-12 font-semibold hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 rounded-md px-5 h-12 font-semibold flex gap-3 items-center hover:bg-violet-600">
              <GameController size={24} />
              Encontar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
