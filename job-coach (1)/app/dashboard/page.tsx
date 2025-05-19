"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageSquare, Users, BookOpen } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ChatInterface } from "@/components/chat-interface"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Link href="/settings">
              <Button variant="outline">Settings</Button>
            </Link>
          </div>
        </div>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="chat">AI Coach</TabsTrigger>
            <TabsTrigger value="resume">Resume Builder</TabsTrigger>
            <TabsTrigger value="questions">Question Bank</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <DashboardShell>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Chat Sessions</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+2 from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Resume Versions</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Last updated 2 days ago</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Practice Questions</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45</div>
                    <p className="text-xs text-muted-foreground">25 completed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mock Interviews</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">+1 from last week</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-blue-100 p-2">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Mock Interview: Software Engineer</p>
                          <p className="text-sm text-muted-foreground">Completed 2 hours ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-blue-100 p-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Resume Updated: Version 3</p>
                          <p className="text-sm text-muted-foreground">Updated 2 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-blue-100 p-2">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Completed 10 HR Questions</p>
                          <p className="text-sm text-muted-foreground">3 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Upcoming Interviews</CardTitle>
                    <CardDescription>You have 2 scheduled mock interviews</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-blue-100 p-2">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Technical Interview: Frontend Developer</p>
                          <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM</p>
                        </div>
                        <Button size="sm">Prepare</Button>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-blue-100 p-2">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Behavioral Interview: Leadership Skills</p>
                          <p className="text-sm text-muted-foreground">May 22, 10:00 AM</p>
                        </div>
                        <Button size="sm">Prepare</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DashboardShell>
          </TabsContent>

          <TabsContent value="chat">
            <DashboardShell>
              <ChatInterface />
            </DashboardShell>
          </TabsContent>

          <TabsContent value="resume">
            <DashboardShell>
              <Card>
                <CardHeader>
                  <CardTitle>Resume Builder</CardTitle>
                  <CardDescription>Create and edit your professional resume with AI assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <FileText className="h-16 w-16 text-blue-600" />
                    <h3 className="text-xl font-semibold">Build Your Resume</h3>
                    <p className="text-center text-muted-foreground max-w-md">
                      Our AI-powered resume builder will help you create a professional resume tailored to your target
                      job. Get started by clicking the button below.
                    </p>
                    <div className="flex gap-4">
                      <Button>Create New Resume</Button>
                      <Button variant="outline">Import Existing</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DashboardShell>
          </TabsContent>

          <TabsContent value="questions">
            <DashboardShell>
              <Card>
                <CardHeader>
                  <CardTitle>HR Question Bank</CardTitle>
                  <CardDescription>Practice with common HR and interview questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">Tell me about yourself</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        This is often the first question in an interview. It's your chance to make a great first
                        impression.
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          View Answer
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">What are your greatest strengths?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Focus on strengths that are relevant to the position you're applying for.
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          View Answer
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">What is your greatest weakness?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Be honest but strategic. Mention a real weakness, but focus on how you're working to improve it.
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          View Answer
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">Why do you want to work for this company?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Show that you've done your research and are genuinely interested in the company.
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm">
                          View Answer
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-center mt-6">
                      <Button>View All Questions</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DashboardShell>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
