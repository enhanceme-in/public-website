import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Pressable,
  Image,
} from "react-native";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import MaskedText from "@/components/MaskedText";
import Zero2HeroFaq from "@/components/Zero2HeroFaq";
import Zero2HeroHead from "../../components/Zero2HeroHead";
import { useQuizStore } from "../../store/quizStore";
import { useReadmeStore } from "../../store/readmeStore";
import LessonItem from "../../components/LessonItem";
import SectionItem from "../../components/SectionItem";
import {
  styles,
  lighterColor,
  lightColor,
  darkColor,
  darkerColor,
  lineColor,
  transColor,
  heroFontSize,
  heroMaskedTextWidth,
  heroMaskedTextSize,
  instructorContentMaxWidth,
  width,
} from "../../components/zero2heroStyles";

// JavaScript DSA course sections (beginner to advanced)
const data = [
  {
    id: "intro",
    title: "Introduction to JavaScript DSA",
    subtitle: "Why learn Data Structures & Algorithms?",
    description:
      "Understand the importance of DSA for interviews and real-world coding. Get an overview of what you'll learn.",
    level: "Beginner",
    lessons: [
      {
        id: "1",
        title: "What is DSA?",
        description:
          "Definition, importance, and real-world applications of Data Structures & Algorithms.",
        sampleProblem:
          "Why do we need efficient algorithms? Give an example from daily life.",
        urlType: "readme",
        url: "/dsajs/lesson/what-is-dsa/README.md",
        locked: false,
      },
      {
        title: "How JavaScript Handles Data",
        description:
          "Primitive vs reference types, memory, and performance basics.",
        sampleProblem:
          "Explain the difference between primitive and reference types in JavaScript.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Big O Notation Basics",
        description:
          "Understanding time and space complexity with simple examples.",
        sampleProblem:
          "What is the time complexity of accessing an element in an array?",
        urlType: "readme",
        locked: true,
      },
    ],
  },
  {
    id: "arrays",
    title: "Arrays & Strings",
    subtitle: "The building blocks",
    description:
      "Learn how to use arrays and strings in JavaScript, including common methods and interview tricks.",
    level: "Beginner",
    lessons: [
      {
        title: "JavaScript Arrays 101",
        description: "Creating, accessing, and modifying arrays.",
        sampleProblem: "Write a function to reverse an array in place.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Common Array Methods",
        description: "map, filter, reduce, forEach, and more.",
        sampleProblem: "Use 'reduce' to sum all numbers in an array.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "String Manipulation",
        description:
          "Working with strings, substrings, and common string methods.",
        sampleProblem: "Check if a string is a palindrome.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Two Pointer Technique",
        description: "Solving problems efficiently with two pointers.",
        sampleProblem:
          "Find two numbers in a sorted array that sum to a target value.",
        urlType: "readme",
        locked: true,
      },
    ],
  },
  {
    id: "linkedlists",
    title: "Linked Lists",
    subtitle: "Singly & Doubly Linked Lists",
    description:
      "Understand how linked lists work, their operations, and how to implement them in JavaScript.",
    level: "Beginner",
    lessons: [
      {
        title: "Singly Linked List Basics",
        description:
          "Node structure, creating and traversing a singly linked list.",
        sampleProblem:
          "Implement a function to print all elements of a singly linked list.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Insertion & Deletion",
        description: "Adding and removing nodes from head, tail, and middle.",
        sampleProblem: "Write a function to delete a node by value.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Reversing a Linked List",
        description: "Iterative and recursive approaches.",
        sampleProblem: "Reverse a singly linked list.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Doubly Linked List",
        description: "Differences, advantages, and implementation.",
        sampleProblem:
          "Implement a doubly linked list with insert and delete operations.",
        urlType: "readme",
        locked: true,
      },
    ],
  },
  {
    id: "stacksqueues",
    title: "Stacks & Queues",
    subtitle: "LIFO & FIFO structures",
    description:
      "Master stack and queue operations, use-cases, and JavaScript implementations.",
    level: "Beginner",
    lessons: [
      {
        title: "Stack Fundamentals",
        description: "Push, pop, peek, and applications.",
        sampleProblem: "Check for balanced parentheses in an expression.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Queue Fundamentals",
        description: "Enqueue, dequeue, and real-world examples.",
        sampleProblem: "Implement a queue using two stacks.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Circular Queue",
        description: "Concept and implementation.",
        sampleProblem: "Design a circular queue with fixed size.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Stack & Queue Interview Problems",
        description: "Classic problems and solutions.",
        sampleProblem: "Evaluate a postfix expression using a stack.",
        urlType: "readme",
        locked: true,
      },
    ],
  },
  {
    id: "hashing",
    title: "Hash Tables & Sets",
    subtitle: "Efficient lookups",
    description:
      "Explore hash maps and sets in JavaScript, collision handling, and practical problems.",
    level: "Intermediate",
    lessons: [
      {
        title: "Hash Table Basics",
        description:
          "How hashing works, collisions, and JavaScript objects as hash maps.",
        sampleProblem: "Find the first non-repeating character in a string.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Sets in JavaScript",
        description: "Unique values, operations, and use-cases.",
        sampleProblem: "Remove duplicates from an array using a Set.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Custom Hash Functions",
        description: "Writing your own hash function and handling collisions.",
        sampleProblem: "Design a simple hash function for strings.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Hash Table Interview Problems",
        description: "Common interview questions and solutions.",
        sampleProblem: "Group anagrams from a list of strings.",
        urlType: "readme",
        locked: true,
      },
    ],
  },
  {
    id: "trees",
    title: "Trees & Binary Trees",
    subtitle: "Hierarchical data structures",
    description:
      "Learn about trees, binary trees, traversals, and how to solve problems using them.",
    level: "Intermediate",
    lessons: [
      {
        title: "Tree Terminology & Types",
        description: "Nodes, edges, height, depth, and types of trees.",
        sampleProblem: "Draw a binary tree for a given array.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Binary Tree Traversals",
        description:
          "Preorder, inorder, postorder, and level order traversals.",
        sampleProblem: "Print all nodes of a binary tree in level order.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Binary Search Trees (BST)",
        description: "BST properties, insertion, deletion, and search.",
        sampleProblem: "Check if a binary tree is a valid BST.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Tree Interview Problems",
        description: "Classic tree problems and solutions.",
        sampleProblem: "Find the lowest common ancestor of two nodes.",
        urlType: "readme",
        locked: true,
      },
    ],
  },
  {
    id: "graphs",
    title: "Graphs",
    subtitle: "Connected data",
    description:
      "Understand graphs, their representations, and basic algorithms like BFS and DFS.",
    level: "Advanced",
    lessons: [
      {
        title: "Graph Basics",
        description:
          "Vertices, edges, adjacency list/matrix, and types of graphs.",
        sampleProblem: "Represent a graph using an adjacency list.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Breadth-First Search (BFS)",
        description: "BFS algorithm, queue usage, and applications.",
        sampleProblem: "Find the shortest path in an unweighted graph.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Depth-First Search (DFS)",
        description: "DFS algorithm, recursion, and applications.",
        sampleProblem: "Detect a cycle in a directed graph.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Graph Interview Problems",
        description: "Common graph problems and solutions.",
        sampleProblem: "Count the number of connected components in a graph.",
        urlType: "readme",
        locked: true,
      },
    ],
  },
  {
    id: "sortingsearching",
    title: "Sorting & Searching Algorithms",
    subtitle: "Classic algorithms",
    description:
      "Implement and analyze sorting (bubble, quick, merge) and searching (binary, linear) algorithms.",
    level: "Intermediate",
    lessons: [
      {
        title: "Bubble, Selection & Insertion Sort",
        description: "Simple sorting algorithms and their analysis.",
        sampleProblem: "Sort an array using insertion sort.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Merge Sort & Quick Sort",
        description: "Divide and conquer sorting algorithms.",
        sampleProblem: "Sort an array using merge sort.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Linear & Binary Search",
        description: "Searching algorithms and their use-cases.",
        sampleProblem: "Find an element in a sorted array using binary search.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Sorting & Searching Interview Problems",
        description: "Classic problems and solutions.",
        sampleProblem: "Find the kth largest element in an array.",
        urlType: "readme",
        locked: true,
      },
    ],
  },
  {
    id: "recursion",
    title: "Recursion & Backtracking",
    subtitle: "Thinking recursively",
    description:
      "Master recursion, backtracking, and solve classic problems like permutations and combinations.",
    level: "Advanced",
    lessons: [
      {
        title: "Recursion Fundamentals",
        description: "Base case, recursive case, and stack overflow.",
        sampleProblem: "Calculate factorial of a number recursively.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Backtracking Basics",
        description: "Solving problems by exploring all possibilities.",
        sampleProblem: "Solve the N-Queens problem.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Recursive Problem Patterns",
        description: "Divide and conquer, dynamic programming intro.",
        sampleProblem: "Find all subsets of a set.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Recursion & Backtracking Interview Problems",
        description: "Classic problems and solutions.",
        sampleProblem: "Generate all permutations of a string.",
        urlType: "readme",
        locked: true,
      },
    ],
  },
  {
    id: "practice",
    title: "Practice Problems & Interview Prep",
    subtitle: "Sharpen your skills",
    description:
      "Tackle real interview questions and practice DSA problems with solutions in JavaScript.",
    level: "All Levels",
    lessons: [
      {
        title: "Array & String Challenges",
        description: "Practice problems on arrays and strings.",
        sampleProblem:
          "Find the longest substring without repeating characters.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Linked List & Stack Challenges",
        description: "Practice problems on linked lists and stacks.",
        sampleProblem: "Detect a cycle in a linked list.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Tree & Graph Challenges",
        description: "Practice problems on trees and graphs.",
        sampleProblem: "Find the diameter of a binary tree.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Sorting, Searching & Recursion Challenges",
        description: "Practice problems on sorting, searching, and recursion.",
        sampleProblem: "Find all unique combinations that sum to a target.",
        urlType: "readme",
        locked: true,
      },
      {
        title: "Mock Interview Set",
        description: "A set of mixed DSA questions for interview simulation.",
        sampleProblem: "Implement an LRU cache.",
        urlType: "readme",
        locked: true,
      },
    ],
  },
];

export default function App() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={{ marginRight: 12 }}
          accessibilityLabel="Go Home"
        >
          <AntDesign name="home" size={28} color={lighterColor} />
        </TouchableOpacity>
        <Text style={{ color: lighterColor, fontSize: 18, fontWeight: "bold" }}>
          JavaScript DSA
        </Text>
      </View>
      <Zero2HeroHead />
      <ScrollView style={{ backgroundColor: lighterColor }}>
        <View
          style={{
            paddingVertical: 16,
            paddingHorizontal: 40,
            alignItems: "center",
            backgroundColor: darkerColor,
          }}
        >
          <MaskedText
            imageUrl="https://cdn.pixabay.com/photo/2023/08/06/09/30/dahlia-8172522_1280.jpg"
            text="JavaScript DSA"
            fontSize={heroMaskedTextSize}
            width={heroMaskedTextWidth}
            height={heroMaskedTextSize}
          />
          <MaskedText
            imageUrl="https://cdn.pixabay.com/photo/2023/08/06/09/30/dahlia-8172522_1280.jpg"
            text="Data Structures & Algorithms"
            fontSize={heroMaskedTextSize}
            width={heroMaskedTextWidth}
            height={heroMaskedTextSize}
          />
          <Text style={{ color: lighterColor, letterSpacing: 4 }}>
            Step-by-step guide to mastering DSA in JavaScript (Beginner to
            Advanced)
          </Text>
          <Text
            style={{
              color: lighterColor,
              fontWeight: "bold",
              fontSize: 20,
              marginVertical: 16,
              letterSpacing: 1.5,
            }}
          >
            Next cohort: Feb 2026 – Enroll now!
          </Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.secondaryCTA}
              onPress={() => Linking.openURL("https://discord.gg/2Eq7Q843")}
            >
              <Text style={styles.secondaryCTAText}>Join Discord</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SectionItem section={item} parentRoute="dsajs" />
          )}
        />
        <View style={{ alignSelf: "center" }}>
          <Image
            source={require("./zero2hero_certificate_sample.png")}
            style={{
              width: width > 500 ? 600 : width,
              height: width > 500 ? 485 : width * 0.8,
            }}
          />
          <Pressable
            onPress={() =>
              router.push(
                "certificate/zero2hero/N4IgxiBcIF4KYCcD2AmAFopIA0IDOAdlCAEoCuADgIYA2AlgAQAiVeaO4AJsQAwDMDALJUEDFDxQA2DnigAXBGTgBfIA"
              )
            }
          >
            <Text>Click here to verify this certificate</Text>
          </Pressable>
        </View>
        <Zero2HeroFaq />
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Tech Craft by Subrata Kumar. Empowering
            developers through real projects.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
