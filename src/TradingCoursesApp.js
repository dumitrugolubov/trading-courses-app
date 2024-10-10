import React, { useState, useEffect } from 'react'
import { ChevronRight, Lock, Unlock, ArrowLeft, User } from 'lucide-react'
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
        setUser({ id: 123, first_name: 'Test', last_name: 'User', username: 'testuser' });
        setIsLoading(false);
      } else {
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
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
          <p className="text-gray-500">Initializing Telegram WebApp</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-red-600">Authentication Error</CardTitle>
            <CardDescription className="text-center">Unable to authenticate with Telegram</CardDescription>
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
    <div className="max-w-md mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Trading Courses</h1>
      
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="courses" className="text-lg py-2">Courses</TabsTrigger>
          <TabsTrigger value="account" className="text-lg py-2">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md">
            {!selectedCourse ? (
              courses.map((course) => (
                <Card key={course.id} className="mb-4 hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.lessons.map((lesson) => (
                        <li key={lesson.id} className="flex items-center justify-between">
                          <span>{lesson.title}</span>
                          {lesson.locked ? (
                            <Lock className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Unlock className="h-4 w-4 text-green-500" />
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleCourseSelect(course)}>
                      View Course <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div>
                <Button variant="outline" className="mb-4" onClick={handleBackToCourses}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
                </Button>
                <h2 className="text-2xl font-bold mb-4 text-blue-600">{selectedCourse.title}</h2>
                {!selectedLesson ? (
                  selectedCourse.lessons.map((lesson) => (
                    <Card key={lesson.id} className="mb-4 hover:shadow-lg transition-shadow duration-200">
                      <CardHeader>
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      </CardHeader>
                      <CardFooter>
                        <Button 
                          className={`w-full ${lesson.locked ? 'bg-gray-300 text-gray-600' : 'bg-blue-500 hover:bg-blue-600 text-white'}`} 
                          onClick={() => handleLessonSelect(lesson)}
                        >
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
                      <CardTitle className="text-xl text-blue-600">{selectedLesson.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{selectedLesson.content}</p>
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
              <CardTitle className="text-2xl text-blue-600">Account</CardTitle>
              <CardDescription>Your Telegram account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <User className="h-12 w-12 text-blue-500" />
                <div>
                  <p className="font-semibold">{user.first_name} {user.last_name}</p>
                  <p className="text-sm text-gray-500">@{user.username || 'Not set'}</p>
                </div>
              </div>
              <div>
                <strong className="text-gray-700">Telegram ID:</strong> 
                <span className="ml-2 text-gray-600">{user.id}</span>
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