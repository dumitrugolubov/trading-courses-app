import React, { useState, useEffect } from 'react'
import { Lock, Unlock, ArrowLeft } from 'lucide-react'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, ScrollArea, Alert, AlertDescription, AlertTitle } from "./components/ui";

const courses = [
  {
    id: 1,
    title: "Forex Fundamentals",
    description: "Learn the basics of forex trading",
    lessons: [
      { 
        id: 1, 
        title: "Introduction to Forex", 
        locked: false,
        content: "Forex, or foreign exchange, is a global market where currencies are traded. This lesson covers the basics of forex trading, including key terminology and market structure."
      },
      { 
        id: 2, 
        title: "Currency Pairs", 
        locked: false,
        content: "Currency pairs are the foundation of forex trading. This lesson explains major, minor, and exotic pairs, and how they are quoted and traded in the forex market."
      },
      { 
        id: 3, 
        title: "Market Analysis", 
        locked: true,
        content: "This advanced lesson covers fundamental and technical analysis techniques used in forex trading. (Unlock this lesson to view full content)"
      },
    ]
  },
  {
    id: 2,
    title: "Advanced Trading Strategies",
    description: "Master complex trading techniques",
    lessons: [
      { 
        id: 1, 
        title: "Trend Following", 
        locked: true,
        content: "Learn how to identify and trade with market trends. (Unlock this lesson to view full content)"
      },
      { 
        id: 2, 
        title: "Breakout Trading", 
        locked: true,
        content: "Master the art of trading breakouts in forex markets. (Unlock this lesson to view full content)"
      },
      { 
        id: 3, 
        title: "Risk Management", 
        locked: true,
        content: "Discover essential risk management techniques to protect your trading capital. (Unlock this lesson to view full content)"
      },
    ]
  },
]

export default function TradingCoursesApp() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeTelegram = () => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();

        if (window.Telegram.WebApp.initDataUnsafe?.user) {
          setUser(window.Telegram.WebApp.initDataUnsafe.user);
        } else {
          setError("Unable to get user data from Telegram");
        }
        setIsLoading(false);
      } else if (process.env.NODE_ENV === 'development') {
        // For local development, use a mock user
        setUser({ id: 123, first_name: 'Test', last_name: 'User', username: 'testuser' });
        setIsLoading(false);
      } else {
        // If Telegram WebApp is not available and not in development, retry after a short delay
        setTimeout(initializeTelegram, 100);
      }
    };

    initializeTelegram();
  }, []);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
    setSelectedLesson(null)
  }

  const handleLessonSelect = (lesson) => {
    if (!lesson.locked) {
      setSelectedLesson(lesson)
    } else {
      setError("This lesson is locked. Please unlock it to view the content.")
    }
  }

  const handleBackToCourses = () => {
    setSelectedCourse(null)
    setSelectedLesson(null)
  }

  const handleBackToLessons = () => {
    setSelectedLesson(null)
  }

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-4 bg-background text-foreground">
        <h1 className="text-2xl font-bold text-center mb-6">Trading Courses</h1>
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Initializing Telegram WebApp</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-4 bg-background text-foreground">
        <h1 className="text-2xl font-bold text-center mb-6">Trading Courses</h1>
        <Card>
          <CardHeader>
            <CardTitle>Authentication Error</CardTitle>
            <CardDescription>Unable to authenticate with Telegram</CardDescription>
          </CardHeader>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-background text-foreground">
      <h1 className="text-2xl font-bold text-center mb-6">Trading Courses</h1>
      
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {!selectedCourse ? (
              courses.map((course) => (
                <Card key={course.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.lessons.map((lesson) => (
                        <li key={lesson.id} className="flex items-center justify-between">
                          <span>{lesson.title}</span>
                          {lesson.locked ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Unlock className="h-4 w-4 text-primary" />
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleCourseSelect(course)}>View Course</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div>
                <Button variant="outline" className="mb-4" onClick={handleBackToCourses}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
                </Button>
                <h2 className="text-2xl font-bold mb-4">{selectedCourse.title}</h2>
                {!selectedLesson ? (
                  selectedCourse.lessons.map((lesson) => (
                    <Card key={lesson.id} className="mb-4">
                      <CardHeader>
                        <CardTitle>{lesson.title}</CardTitle>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleLessonSelect(lesson)}>
                          {lesson.locked ? "Unlock Lesson" : "View Lesson"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardHeader>
                      <Button variant="outline" className="mb-2" onClick={handleBackToLessons}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lessons
                      </Button>
                      <CardTitle>{selectedLesson.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{selectedLesson.content}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Your Telegram account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <strong>Name:</strong> {user.first_name} {user.last_name}
              </div>
              <div>
                <strong>Username:</strong> {user.username || 'Not set'}
              </div>
              <div>
                <strong>Telegram ID:</strong> {user.id}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}