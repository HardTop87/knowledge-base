---
slug: job-stuck
category: troubleshooting
status: published
lang: en
title: "Job Is Stuck in a Status"
---

## Check the job status

1. Go to **Data → Production → Jobs**
2. Find the job and note its current status (e.g. `PREPRESS`, `PRESS`, `WAITING`)

## Why a job gets stuck

A job moves forward as its **Operations** are transitioned on the shopfloor and as **Workflows** react to its events. A job looks "stuck" when one of those stops happening:

| Situation | Common causes |
|---|---|
| Won't advance past a production status (e.g. **Prepress**, **Press**) | The current Operation hasn't been transitioned to **Completed** on the shopfloor |
| Sits in **Waiting** | A Workflow is paused on a HITL Task that hasn't been completed, or it's waiting on a dependency |
| An Operation never starts (**Pending** / **Available**) | No Work Center picked it up, or a preceding Operation isn't finished |

## When a Workflow should have advanced it

1. Check whether a Workflow should trigger on this job's events
2. Verify the trigger conditions in the Workflow
3. Open the Workflow → **Executions** tab and check for failures

[Workflow Is Not Triggering](#workflow-not-triggering)

## When a HITL Task is blocking

1. Open the Job
2. Check the **Tasks** section for open, unassigned Tasks
3. Assign and complete the Task to resume the Workflow

## Advancing an Operation manually

1. Open the Job and go to its **Operations**
2. Transition the current Operation to its next state (e.g. Running → Completed) — shopfloor progress is driven by Operation transitions, not by editing the job status directly
3. Document the reason in the job Notes

## Operation states (reference)

An Operation moves through this state machine: **Pending → Available → Setup → Running → Cleanup → Completed**. From there it can also be **Stopped**, **Failed**, **Cancelled**, or put back into **Restarting**. "Complete" on the shopfloor transitions the current Operation to **Completed**; only certain transitions are allowed from each state.

> Job production statuses (e.g. **Prepress**, **Press**, **Postpress**) are defined by your deployment's industry **vertical**, so your tenant may show more or different ones than another instance. The Operation states above are universal across every vertical.

## Escalation

Check Workflow execution logs for error messages around the time the job stopped progressing.