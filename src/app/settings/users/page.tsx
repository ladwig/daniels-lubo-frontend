'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "user"
  status: "active" | "inactive"
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Max Mustermann",
    email: "max.mustermann@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Anna Schmidt",
    email: "anna.schmidt@example.com",
    role: "manager",
    status: "active",
  },
  {
    id: "3",
    name: "Peter Meyer",
    email: "peter.meyer@example.com",
    role: "user",
    status: "inactive",
  },
]

const roleConfig = {
  admin: { label: "Administrator", variant: "default" as const },
  manager: { label: "Manager", variant: "secondary" as const },
  user: { label: "Benutzer", variant: "outline" as const },
}

const statusConfig = {
  active: { label: "Aktiv", variant: "success" as const },
  inactive: { label: "Inaktiv", variant: "secondary" as const },
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState(mockUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSaveUser = (userData: Partial<User>) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...userData } : user
      ))
    } else {
      // Add new user
      const newUser: User = {
        id: `${Date.now()}`,
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "user",
        status: userData.status || "active",
      }
      setUsers([...users, newUser])
    }
    setIsDialogOpen(false)
    setSelectedUser(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Benutzerverwaltung</h1>
          <p className="text-sm text-muted-foreground">
            Benutzer verwalten und Berechtigungen zuweisen
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedUser(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Benutzer hinzufügen
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? "Benutzer bearbeiten" : "Neuer Benutzer"}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              user={selectedUser}
              onSave={handleSaveUser}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Benutzer suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>E-Mail</TableHead>
                <TableHead>Rolle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={roleConfig[user.role].variant}>
                      {roleConfig[user.role].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[user.status].variant}>
                      {statusConfig[user.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user)
                        setIsDialogOpen(true)
                      }}
                    >
                      Bearbeiten
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}

function UserForm({
  user,
  onSave,
  onCancel,
}: {
  user: User | null
  onSave: (userData: Partial<User>) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [role, setRole] = useState<User["role"]>(user?.role || "user")
  const [status, setStatus] = useState<User["status"]>(user?.status || "active")

  return (
    <div className="space-y-4 pt-4">
      <div className="grid gap-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <label className="text-sm font-medium">E-Mail</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Rolle</label>
          <Select value={role} onValueChange={(value: User["role"]) => setRole(value)}>
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="user">Benutzer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Status</label>
          <Select value={status} onValueChange={(value: User["status"]) => setStatus(value)}>
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Aktiv</SelectItem>
              <SelectItem value="inactive">Inaktiv</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button
          onClick={() => onSave({ name, email, role, status })}
          disabled={!name || !email}
        >
          Speichern
        </Button>
      </div>
    </div>
  )
} 