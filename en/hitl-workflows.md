---
slug: hitl-workflows
category: workflows-automation
status: published
lang: en
title: "Human-in-the-Loop (HITL) Workflows"
---

## What is HITL?

Human-in-the-Loop (HITL) means pausing an automated Workflow and waiting for a person to take action before continuing. Common uses:

- Manager approval for estimates above a certain value
- Quality sign-off before a job moves to the next stage
- Exception handling when a machine reports an error
- Data correction when incoming data is incomplete

## How it works

The **Task** node creates a human task and pauses the Workflow. The Workflow resumes only when the task is marked as completed — either by a person in the platform or by an external signal.

## How to add a HITL step

1. In the Workflow editor, add a **Task** node at the point where you want the pause
2. Configure the task:
   - **Title** — what the person needs to do (e.g. `Review estimate before sending`)
   - **Description** — additional context
   - **Assignee** — a specific user, or leave blank for anyone to pick up
   - **Due in** — optional deadline
3. Connect the node output to the steps that should run after approval

## Completing a task

Assigned tasks appear in the **My Tasks** section of the CoCoCo sidebar. The assignee opens the task, reviews the context, and clicks **Complete**. The Workflow then continues from the point it paused.