'use client'

import { useState, useEffect } from 'react'
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function SavingsGoal() {
  const [currentSavings, setCurrentSavings] = useState(0)
  const goal = 10000
  const months = 18
  const monthlyTarget = goal / months

  useEffect(() => {
    loadSavedData()
  }, [])

  const loadSavedData = () => {
    const savedAmount = localStorage.getItem('currentSavings')
    if (savedAmount) {
      setCurrentSavings(parseFloat(savedAmount))
    }
  }

  const progress = (currentSavings / goal) * 100
  const remainingAmount = goal - currentSavings
  const remainingMonths = Math.max(0, months - Math.floor(currentSavings / monthlyTarget))

  const handleSavingsUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setCurrentSavings(isNaN(value) ? 0 : value)
  }

  const handleSave = () => {
    localStorage.setItem('currentSavings', currentSavings.toString())
    toast({
      title: "Datos guardados",
      description: `Se han guardado $${currentSavings.toFixed(2)} como tus ahorros actuales.`,
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Meta de Ahorro: $10,000 en 18 meses</CardTitle>
        <CardDescription>Ahorra ${monthlyTarget.toFixed(2)} al mes para alcanzar tu meta</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-savings">Ahorros actuales</Label>
            <div className="flex space-x-2">
              <Input
                id="current-savings"
                type="number"
                value={currentSavings}
                onChange={handleSavingsUpdate}
                placeholder="Ingresa tus ahorros actuales"
              />
              <Button onClick={handleSave}>Guardar</Button>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-center">
            Has ahorrado ${currentSavings.toFixed(2)} de ${goal}
          </p>
          <p className="text-center">
            Te faltan ${remainingAmount.toFixed(2)} en {remainingMonths} meses
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-4">
        <h3 className="font-semibold">Consejos para alcanzar tu meta:</h3>
        <ul className="list-disc list-inside text-sm">
          <li>Crea un presupuesto mensual y apégate a él</li>
          <li>Reduce gastos innecesarios</li>
          <li>Busca formas de aumentar tus ingresos</li>
          <li>Automatiza tus ahorros con transferencias programadas</li>
          <li>Revisa tu progreso regularmente y ajusta según sea necesario</li>
        </ul>
      </CardFooter>
    </Card>
  )
}